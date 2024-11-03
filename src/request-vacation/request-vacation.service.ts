import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateRequestVacationDto } from './dto/create-request-vacation.dto';
import { UpdateRequestVacationDto } from './dto/update-request-vacation.dto';
import { requestVacationRepository } from './repository/request-vacations.repository';
import { EmployeesService } from 'src/employees/employees.service';
import { DataSource } from 'typeorm';
import { CreateRequestApprovalDto } from 'src/request-approvals/dto/create-request-approval.dto';
import { DepartmentsService } from 'src/departments/departments.service';
import { RequestApprovalRepository } from 'src/request-approvals/repository/request-approvals.repository';
import { MailClientService } from 'src/mail-client/mail-client.service';
import { Department } from 'src/departments/entities/department.entity';
import { Employee } from 'src/employees/entities/employee.entity';
import { RequestsService } from 'src/requests/requests.service';

@Injectable()
export class RequestVacationService {
  constructor(
    private readonly requestVacationRepository: requestVacationRepository,
    private readonly requestService: RequestsService,
    private readonly employeeRService: EmployeesService,
    private readonly requestApprovalRepository: RequestApprovalRepository,
    private readonly dataSource: DataSource,
    private readonly departmentService: DepartmentsService,
    private readonly mailClient: MailClientService,
  ) {}

  //this method is used to create a new vacation request, the request is related to the vacation request and the approvals
  async create(
    createRequestVacationDto: CreateRequestVacationDto,
    EmployeeId: string,
  ) {
    // 1. Create a new transaction
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 2. Validate if the employee exists and if have enough days to request
      await this.employeeRService.validateAvaiableVacationsDays(
        EmployeeId,
        createRequestVacationDto.daysRequested,
      );

      // 3. Get the entities needed for the approval process
      const { RRHHdepartment, mayor, RequesterDepartment } =
        await this.getApprovalEntities(EmployeeId);
      // 4. Create the request who will be related to the vacation request and approvals
      //requestTypeId 1 is for vacation requests
      const request = await this.requestService.createRequest(
        EmployeeId,
        1,
        queryRunner,
      );

      // 5. Create the approvals for the request
      const approvals = await this.createApprovals(
        EmployeeId,
        RequesterDepartment.departmentHeadId,
        RRHHdepartment.departmentHeadId,
        mayor.id,
        request.id,
      );

      // 6. Auto approve the request if the employee is the department head/ doesn't hace department head or the mayor
      await this.autoApproveRequest(
        approvals,
        RequesterDepartment,
        RRHHdepartment,
        mayor,
        EmployeeId,
      );

      // 7. Create the vacation request
      const newVacationRequest = this.requestVacationRepository.create({
        ...createRequestVacationDto,
        RequestId: request.id, //Assign the request id to the vacation request
      });

      // 8. Create the approval process
      const ApprovalProcess =
        this.requestApprovalRepository.createMany(approvals);

      // 9. Save the approval procces entities
      await queryRunner.manager.save(ApprovalProcess);

      // 10. Save the vacation request
      const savedRequest = await queryRunner.manager.save(newVacationRequest);

      // 11. Commit the transaction
      await queryRunner.commitTransaction();

      // 12. Send the confirmation mails to the approvers and the requester
      await this.sendRequestConfirmationMails(approvals);

      return savedRequest;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      if (
        error instanceof NotFoundException ||
        error instanceof ConflictException
      ) {
        throw error;
      }

      throw new InternalServerErrorException('Error al crear la solicitud: ');
    } finally {
      await queryRunner.release(); // release the queryRunner
    }
  }

  //this method is used to send the confirmation mails to the approvers and the requester, the mail is sent only to the first step of the approval process
  async sendRequestConfirmationMails(approvals: CreateRequestApprovalDto[]) {
    // Send mail to the first step of the approval process

    const firstStepIndex = approvals.findIndex(
      (item) => item.approved === undefined,
    );

    if (firstStepIndex === -1) {
      throw new Error('No se encontró ningún elemento sin aprobación.');
    }

    //destructuring the approver and requester id of the first step
    const { approverId, requesterId } = approvals[firstStepIndex];

    const approver = await this.employeeRService.findOneById(approverId);

    const requester = await this.employeeRService.findOneById(requesterId);

    const wholeName = `${requester.Name} ${requester.Surname1} ${requester.Surname2}`;

    //mail to notify the approver
    this.mailClient.sendApproverNotificationMail(
      approver.Email,
      requester.id,
      wholeName,
      'Vacaciones',
    );

    //mail to notify the requester
    this.mailClient.sendRequestConfirmationMail(requester.Email, 'Vacaciones');
  }

  //this method is used to get the entities needed for the approval process and validate if the department head of RRHH exists
  async getApprovalEntities(EmployeeId: string) {
    const RRHHdepartment =
      await this.departmentService.findOneByName('RECURSOS HUMANOS');

    const mayor = await this.employeeRService.findMayor();

    const RequesterDepartment =
      await this.employeeRService.getEmployeeDepartment(EmployeeId);

    if (!RequesterDepartment || !RRHHdepartment || !mayor) {
      throw new NotFoundException(
        'No se encontraron los datos necesarios para la aprobación de la solicitud',
      );
    }

    await this.departmentService.validateDepartmentHead(RRHHdepartment);

    return { RRHHdepartment, mayor, RequesterDepartment }; //return the entities who will be used in the approval process
  }

  //this method is used to create the approvals for the request. The approvals are created in the order of the process and the approvers are the department head, the RRHH head and the mayor
  async createApprovals(
    EmployeeId: string,
    departmentHeadId: string,
    RRHHHeadId: string,
    mayorId: string,
    requesterId: number,
  ) {
    // Obtener los datos de cada aprobador
    const departmentHead =
      await this.employeeRService.findOneById(departmentHeadId);
    const RRHHHead = await this.employeeRService.findOneById(RRHHHeadId);
    const mayor = await this.employeeRService.findOneById(mayorId);

    // Verificar que los aprobadores existen
    if (!departmentHead || !RRHHHead || !mayor) {
      throw new NotFoundException(
        'No se pudieron obtener los datos de los aprobadores.',
      );
    }

    const approvals: CreateRequestApprovalDto[] = [
      {
        approverId: departmentHeadId,
        Name: departmentHead.Name,
        Surname1: departmentHead.Surname1,
        Surname2: departmentHead.Surname2,
        processNumber: 1,
        current: false,
        RequestId: requesterId,
        requesterId: EmployeeId,
      },
      {
        approverId: RRHHHeadId,
        Name: RRHHHead.Name,
        Surname1: RRHHHead.Surname1,
        Surname2: RRHHHead.Surname2,
        processNumber: 2,
        current: false,
        RequestId: requesterId,
        requesterId: EmployeeId,
      },
      {
        approverId: mayorId,
        Name: mayor.Name,
        Surname1: mayor.Surname1,
        Surname2: mayor.Surname2,
        processNumber: 3,
        current: false,
        RequestId: requesterId,
        requesterId: EmployeeId,
      },
    ];

    return approvals;
  }
  // this method is used to auto approve the request if the employee is the department head/ doesn't hace department head or the mayor
  async autoApproveRequest(
    approvals: CreateRequestApprovalDto[],
    RequesterDepartment: Department,
    RRHHdepartment: Department,
    mayor: Employee,
    EmployeeId: string,
  ) {
    // If the department head is not assigned, or the department head is the employee who is requesting the vacation, the department approval is true
    if (
      !RequesterDepartment.departmentHeadId ||
      RequesterDepartment.departmentHeadId === EmployeeId
    ) {
      approvals[0].approved = true;
      approvals[0].observation =
        'La solicitud fue aprobada automáticamente por el sistema en el proceso 1 ya que el solicitante es el jefe del departamento en el que está asignado o no poseé jefe de departamento';
      approvals[0].ApprovedDate = new Date();
    }
    // If the RRHH  head is the employee who is requesting the vacation, the RRHH department approval is true (yeilin)
    if (RRHHdepartment.departmentHeadId === EmployeeId) {
      approvals[1].approved = true;
      approvals[1].observation =
        'La solicitud fue aprobada automáticamente por el sistema en el proceso 2 ya que el solicitante es el jefe del departamento de RRHH';
      approvals[1].ApprovedDate = new Date();
    }
    // If the mayor is the employee who is requesting the vacation, the mayor approval is true (teddy o vica)
    if (mayor.id === EmployeeId) {
      approvals[2].approved = true;
      approvals[2].observation =
        'La solicitud fue aprobada automáticamente por el sistema en el proceso 3 ya que el solicitante es Alcalde municipal';
      approvals[2].ApprovedDate = new Date();
    }

    // Find the first approval index not approved
    const firstNoApprovedIndex = approvals.findIndex(
      (index) => !index.approved,
    );

    // Set the first approval not approved as the current approval to start the approval process from there
    approvals[firstNoApprovedIndex].current = true;
  }

  async findAll() {
    return await this.requestVacationRepository.findAll();
  }

  async findOne(id: number) {
    return await this.requestVacationRepository.findOneById(id);
  }

  async update(id: number, updateRequestVacationDto: UpdateRequestVacationDto) {
    const requestToEdit = await this.requestVacationRepository.findOneById(id);

    if (!requestToEdit) {
      throw new NotFoundException('Solicitud no encontrada');
    }

    return await this.requestVacationRepository.save({
      ...requestToEdit,
      ...updateRequestVacationDto,
    });
  }

  async remove(id: number) {
    const requestToRemove =
      await this.requestVacationRepository.findOneById(id);

    if (!requestToRemove) {
      throw new NotFoundException('Solicitud no encontrada');
    }

    return await this.requestVacationRepository.remove(requestToRemove);
  }
}
