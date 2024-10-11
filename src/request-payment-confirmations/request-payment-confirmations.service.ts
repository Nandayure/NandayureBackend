import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateRequestPaymentConfirmationDto } from './dto/create-request-payment-confirmation.dto';
import { UpdateRequestPaymentConfirmationDto } from './dto/update-request-payment-confirmation.dto';
import { RequestPaymentConfirmationRepository } from './repository/RequestPaymentConfirmation.repository';
import { DataSource } from 'typeorm';
import { EmployeesService } from 'src/employees/employees.service';
import { DepartmentsService } from 'src/departments/departments.service';
import { CreateRequestApprovalDto } from 'src/request-approvals/dto/create-request-approval.dto';
import { MailClientService } from 'src/mail-client/mail-client.service';
import { RequestsService } from 'src/requests/requests.service';
import { RequestApprovalRepository } from 'src/request-approvals/repository/request-approvals.repository';
import { Employee } from 'src/employees/entities/employee.entity';

@Injectable()
export class RequestPaymentConfirmationsService {
  constructor(
    private readonly paymentConfirmationRepository: RequestPaymentConfirmationRepository,
    private readonly dataSource: DataSource,
    private readonly employeeService: EmployeesService,
    private readonly departmentService: DepartmentsService,
    private readonly requestService: RequestsService,
    private readonly mailClient: MailClientService,
    private readonly requestApprovalRepository: RequestApprovalRepository,
  ) {}
  async create(
    createRequestPaymentConfirmationDto: CreateRequestPaymentConfirmationDto,
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

      // 3. Create a new request who will be related to the payment confirmation
      const request = await this.requestService.createRequest(
        EmployeeId,
        3, //requestTypeId 3 is for payment confirmation
        queryRunner,
      );

      // 4. Create a new payment confirmation request
      const newPaymentRequest = this.paymentConfirmationRepository.create({
        ...createRequestPaymentConfirmationDto,
        RequestId: request.id,
      });

      // 5. Save the payment confirmation request
      const savedPaymentRequest =
        await queryRunner.manager.save(newPaymentRequest);

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

      return savedPaymentRequest;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Errror al crear la solicitud');
    } finally {
      await queryRunner.release();
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

  async sendRequestConfirmationMails(approver: Employee, requester: Employee) {
    //mail to notify the approver

    const wholeName = `${requester.Name} ${requester.Surname1} ${requester.Surname2}`;

    this.mailClient.sendApproverNotificationMail(
      approver.Email,
      requester.id,
      wholeName,
      'Boleta de pago',
    );

    //mail to notify the requester
    if (approver.id !== requester.id) {
      this.mailClient.sendRequestConfirmationMail(
        requester.Email,
        'Boleta de pago',
      );
    }
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
    return await this.paymentConfirmationRepository.findAll();
  }

  async findOne(id: number) {
    return await this.paymentConfirmationRepository.findOneById(id);
  }

  async update(
    id: number,
    updateRequestPaymentConfirmationDto: UpdateRequestPaymentConfirmationDto,
  ) {
    const paymentRequestToEdit =
      await this.paymentConfirmationRepository.findOneById(id);

    if (!paymentRequestToEdit) {
      throw new NotFoundException('No se encontró la solicitud a editar');
    }

    return await this.paymentConfirmationRepository.save({
      ...paymentRequestToEdit,
      ...updateRequestPaymentConfirmationDto,
    });
  }

  async remove(id: number) {
    const paymentRequestToRemove =
      await this.paymentConfirmationRepository.findOneById(id);

    if (!paymentRequestToRemove) {
      throw new NotFoundException('No se encontró la solicitud a eliminar');
    }

    return this.paymentConfirmationRepository.remove(paymentRequestToRemove);
  }
}
