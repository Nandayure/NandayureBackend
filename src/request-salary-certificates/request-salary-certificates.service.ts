import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateRequestSalaryCertificateDto } from './dto/create-request-salary-certificate.dto';
import { UpdateRequestSalaryCertificateDto } from './dto/update-request-salary-certificate.dto';
import { RequestSalaryCertificateRepository } from './repository/RequestSalaryCertificate.repository';
import { DepartmentsService } from 'src/departments/departments.service';
import { EmployeesService } from 'src/employees/employees.service';
import { MailClientService } from 'src/mail-client/mail-client.service';
import { RequestApprovalRepository } from 'src/request-approvals/repository/request-approvals.repository';
import { RequestsService } from 'src/requests/requests.service';
import { DataSource } from 'typeorm';
import { CreateRequestApprovalDto } from 'src/request-approvals/dto/create-request-approval.dto';
import { Employee } from 'src/employees/entities/employee.entity';

@Injectable()
export class RequestSalaryCertificatesService {
  constructor(
    private readonly requestSalaryCertificateRepository: RequestSalaryCertificateRepository,
    private readonly dataSource: DataSource,
    private readonly employeeService: EmployeesService,
    private readonly departmentService: DepartmentsService,
    private readonly requestService: RequestsService,
    private readonly mailClient: MailClientService,
    private readonly requestApprovalRepository: RequestApprovalRepository,
  ) {}

  async create(
    createRequestSalaryCertificateDto: CreateRequestSalaryCertificateDto,
    EmployeeId: string,
  ) {
    // 1. Create a new transaction
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 2. Validate the employee who made the request and the RRHH department
      const { existEmployee, RRHHdepartment, deparmentHead } =
        await this.getApprovalEntity(EmployeeId);

      // 3. Create a new request who will be related to the salary certificate
      const request = await this.requestService.createRequest(
        EmployeeId,
        2, //requestTypeId 3 is for salary certificate
        queryRunner,
      );

      // 4. Create a new salary certificate request
      const newSalaryCertificateRequest =
        this.requestSalaryCertificateRepository.create({
          ...createRequestSalaryCertificateDto,
          RequestId: request.id,
        });

      // 5. Save the payment salary certificate request
      const savedSalaryCertificateRequest = await queryRunner.manager.save(
        newSalaryCertificateRequest,
      );

      // 6. Create a new approval for the payment confirmation request
      const approval = await this.createApproval(
        RRHHdepartment.departmentHeadId,
        request.id,
        EmployeeId,
      );

      await queryRunner.manager.save(approval);

      // 7. Commit the transaction
      await queryRunner.commitTransaction();

      // 8. Send an email to the boss of the RRHH department and the employee who made the request to notify them
      this.sendRequestConfirmationMails(deparmentHead, existEmployee);

      return savedSalaryCertificateRequest;
    } catch (error) {
      queryRunner.rollbackTransaction();
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Error al crear la solicitud de constancia salarial',
      );
    } finally {
      await queryRunner.release();
    }
  }

  async sendRequestConfirmationMails(approver: Employee, requester: Employee) {
    //mail to notify the approver

    const wholeName = `${requester.Name} ${requester.Surname1} ${requester.Surname2}`;

    this.mailClient.sendApproverNotificationMail(
      approver.Email,
      requester.id,
      wholeName,
      'Constancia salarial',
    );

    //mail to notify the requester
    if (approver.id !== requester.id) {
      this.mailClient.sendRequestConfirmationMail(
        requester.Email,
        'Constancia salarial',
      );
    }
  }

  async createApproval(
    departmentHeadId: string,
    requestId: number,
    EmployeeId: string,
  ) {
    // Create a new approval for the payment confirmation request

    const approval: CreateRequestApprovalDto = {
      approverId: departmentHeadId,
      processNumber: 1,
      current: true,
      RequestId: requestId,
      requesterId: EmployeeId,
    };

    return this.requestApprovalRepository.create(approval);
  }

  async getApprovalEntity(EmployeeId: string) {
    // Validate if the employee who request exists
    const existEmployee = await this.employeeService.findOneById(EmployeeId);

    if (!existEmployee) {
      throw new NotFoundException('El empleado no existe');
    }

    // Validate if the RRHH department exists
    const RRHHdepartment =
      await this.departmentService.findOneByName('RECURSOS HUMANOS');

    if (!RRHHdepartment) {
      throw new NotFoundException(
        'No se pueede realizar una solicitud sin el departamento de recursos humanos',
      );
    }
    //validate if RRHH deparment has a boos
    await this.departmentService.validateDepartmentHead(RRHHdepartment);

    const deparmentHead = await this.employeeService.findOneById(
      RRHHdepartment.departmentHeadId,
    );

    return { existEmployee, RRHHdepartment, deparmentHead };
  }

  async findAll() {
    return await this.requestSalaryCertificateRepository.findAll();
  }

  async findOne(id: number) {
    return await this.requestSalaryCertificateRepository.findOneById(id);
  }

  async update(
    id: number,
    updateRequestSalaryCertificateDto: UpdateRequestSalaryCertificateDto,
  ) {
    const requestToEdit =
      await this.requestSalaryCertificateRepository.findOneById(id);

    if (!requestToEdit) {
      throw new NotFoundException('Solicitud no encontrada');
    }

    return await this.requestSalaryCertificateRepository.save({
      ...requestToEdit,
      ...updateRequestSalaryCertificateDto,
    });
  }

  async remove(id: number) {
    const requestToRemove =
      await this.requestSalaryCertificateRepository.findOneById(id);

    if (!requestToRemove) {
      throw new NotFoundException('Solicitud no encontrada');
    }

    return await this.requestSalaryCertificateRepository.remove(
      requestToRemove,
    );
  }
}
