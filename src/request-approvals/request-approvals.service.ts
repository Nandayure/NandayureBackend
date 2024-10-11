import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
//import { CreateRequestApprovalDto } from './dto/create-request-approval.dto';
import { UpdateRequestApprovalDto } from './dto/update-request-approval.dto';
import { RequestApprovalRepository } from './repository/request-approvals.repository';
import { EmployeesService } from 'src/employees/employees.service';
import { MailClientService } from 'src/mail-client/mail-client.service';
import { RequestRepository } from 'src/requests/repository/request.repository';
import { DataSource, IsNull, QueryRunner } from 'typeorm';
import { RequestApproval } from './entities/request-approval.entity';

@Injectable()
export class RequestApprovalsService {
  constructor(
    private readonly requestApprovalRepository: RequestApprovalRepository,
    private readonly requestRepository: RequestRepository,
    private readonly employeeRepository: EmployeesService,
    private readonly mailClient: MailClientService,
    private readonly dataSource: DataSource,
  ) {}

  async findAll() {
    return await this.requestApprovalRepository.findAll();
  }

  async findCurrentRequestToApprove(approverId: string) {
    return await this.requestApprovalRepository.findAll({
      where: { approverId, approved: IsNull(), current: true },
      relations: {
        Request: {
          RequestType: true,
          RequestSalaryCertificate: true,
          RequestPaymentConfirmation: true,
          RequestVacation: true,
        },
      },
    });
  }

  async findByRequestId(id: number) {
    return await this.requestApprovalRepository.findOne({
      where: { RequestId: id },
    });
  }

  async update(
    id: number,
    updateRequestApprovalDto: UpdateRequestApprovalDto,
    approverId: string,
  ) {
    // 1. Create a new transaction
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      //2. Validate if the request approval exists and is the current process
      const existRequestApproval = await this.validateRequestApproval(id);

      //3. Validate if the approver is the same as the one who must approve
      if (existRequestApproval.approverId !== approverId) {
        throw new BadRequestException(
          'No tiene permisos para aprobar esta solicitud',
        );
      }
      //4. Update the request approval instance
      const requestApprovalToEdit = this.requestApprovalRepository.create({
        ...existRequestApproval,
        ...updateRequestApprovalDto,
        ApprovedDate: new Date(),
        current: false,
      });

      //5. Save the updated request approval instance
      const updated = await queryRunner.manager.save(requestApprovalToEdit);

      //6. Validate if there is a next step in the process and update the request state
      const { mailType, nextStep, request } = await this.validateNextStep(
        updated,
        existRequestApproval.RequestId,
        queryRunner,
      );

      //7. Commit the transaction
      await queryRunner.commitTransaction();

      //Thiis instance may be use to show information at the email type 3
      // const approver = await this.employeeRepository.findOneById(
      //   updated.approverId,
      // );

      // This istance is used to send the email to the requester
      const requester = await this.employeeRepository.findOneById(
        updated.requesterId,
      );
      //Case request is rejected
      if (mailType === false) {
        this.mailClient.sendRequestResolution(
          requester.Email,
          request.RequestType.name,
          false,
        );

        //Case request is approved
      } else if (mailType === true) {
        this.mailClient.sendRequestResolution(
          requester.Email,
          request.RequestType.name,
          true,
        );
        //Case there is a next step to approve or reject
      } else {
        const nextApprover = await this.employeeRepository.findOneById(
          nextStep.approverId,
        );
        this.mailClient.sendNewRequestProcessApproverMail(
          nextApprover.Email,
          requester.id,
          requester.Name,
          request.RequestType.name,
        );
      }
      return updated;
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(e);
    } finally {
      await queryRunner.release(); // release the queryRunner
    }
  }

  async validateRequestApproval(id: number) {
    const requestApproval = await this.requestApprovalRepository.findOne({
      where: { id: id },
      relations: {
        Request: true,
      },
    });

    if (!requestApproval) {
      throw new NotFoundException('Registro no encontrado');
    }

    if (requestApproval.current === false) {
      throw new BadRequestException('No es el proceso actual');
    }

    if (
      requestApproval.Request.RequestStateId === 2 ||
      requestApproval.Request.RequestStateId === 3
    ) {
      throw new BadRequestException('La solicitud ya fue aprobada o rechazada');
    }
    return requestApproval;
  }

  async validateNextStep(
    updated: RequestApproval,
    RequestId: number,
    queryRunner: QueryRunner,
  ) {
    let mailType = null;

    const request = await this.requestRepository.findOne({
      where: { id: RequestId },
      relations: {
        RequestType: true,
      },
    });
    const nextStep = await queryRunner.manager.findOne(RequestApproval, {
      where: {
        RequestId: RequestId,
        approved: IsNull(),
      },
      order: { processNumber: 'ASC' },
    });
    console.log('nextStep', nextStep);

    if (updated.approved) {
      if (nextStep) {
        nextStep.current = true;
        await queryRunner.manager.save(nextStep);
      } else {
        request.RequestStateId = 2; // Aprobado
        await queryRunner.manager.save(request);
        mailType = true;
      }
    } else {
      request.RequestStateId = 3; // Rechazado
      await queryRunner.manager.save(request);
      mailType = false;
    }

    return { mailType, nextStep, request };
  }

  async remove(id: number) {
    const existRequestApproval =
      await this.requestApprovalRepository.findOneById(id);

    if (!existRequestApproval) {
      throw new NotFoundException('Registro no encontrado');
    }

    return await this.requestApprovalRepository.remove(existRequestApproval);
  }
}
