import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { CreateMailClientDto } from './dto/create-mail-client.dto';
import { WelcomeMail } from './templates/WelcomeMail';
import { RecoverPasswordMail } from './templates/RecoverPasswordMail';
import { RequestConfirmationMail } from './templates/RequestConfirmationMail';
import { ApproverNotificationMail } from './templates/ApproverNotificationMail';
import { RequestResolutionMail } from './templates/RequestResolutionMail';
import { CancelationRequestMailToApprover } from './templates/CancelationRequestMailToApprover';

@Injectable()
export class MailClientService {
  constructor(private readonly mailService: MailerService) {}

  async sendWelcomeMail(createMailClientDto: CreateMailClientDto) {
    try {
      await this.mailService.sendMail({
        from: 'RH-Nandayure',
        to: createMailClientDto.to,
        subject: createMailClientDto.subject,
        text: createMailClientDto.message,
        html: await WelcomeMail(
          createMailClientDto.EmployeeId,
          createMailClientDto.Password,
          createMailClientDto.LoginURL,
        ),
        attachments: [
          {
            filename: 'MuniLogo',
            path: './src/mail-client/assets/MuniLogo.jpeg',
            cid: 'logoImage',
          },
        ],
      });
    } catch (error) {
      throw new Error('Error al enviar el correo electrónico');
    }
  }

  async sendCancelationRequestToApproverMail(
    approverMail: string,
    requesterId: string,
    requesterName: string,
    requestType: string,
    requesterEmail: string,
    cancelationReason: string,
  ) {
    try {
      await this.mailService.sendMail({
        from: 'RH-Nandayure',
        to: approverMail,
        subject: `Solicitud Cancelada: ${requestType}`,
        html: await CancelationRequestMailToApprover(
          requesterId,
          requesterName,
          requestType,
          requesterEmail,
          cancelationReason,
        ),
        attachments: [
          {
            filename: 'MuniLogo.jpeg',
            path: './src/mail-client/assets/MuniLogo.jpeg',
            cid: 'logoImage',
          },
        ],
      });
    } catch (error) {
      throw new Error('Error al enviar el correo de cancelación');
    }
  }

  async sendRecoverPasswordMail(createMailClientDto: CreateMailClientDto) {
    try {
      await this.mailService.sendMail({
        from: 'RH-Nandayure',
        to: createMailClientDto.to,
        subject: createMailClientDto.subject,
        text: createMailClientDto?.message,
        html: await RecoverPasswordMail(createMailClientDto.RecoverPasswordURL),
        attachments: [
          {
            filename: 'MuniLogo',
            path: './src/mail-client/assets/MuniLogo.jpeg',
            cid: 'logoImage',
          },
        ],
      });
    } catch (error) {
      throw new Error('Error al enviar el correo electrónico');
    }
  }

  async sendRequestConfirmationMail(mail: string, requestType: string) {
    try {
      await this.mailService.sendMail({
        from: 'RH-Nandayure',
        to: mail,
        subject: `Solicitud de ${requestType} enviada`,
        text: 'Su solicitud ha sido enviada con éxito, pronto recibirá una respuesta',
        html: await RequestConfirmationMail(requestType),
        attachments: [
          {
            filename: 'MuniLogo',
            path: './src/mail-client/assets/MuniLogo.jpeg',
            cid: 'logoImage',
          },
        ],
      });
    } catch (error) {
      console.error('❌ Error al enviar RequestResolutionMail:', error);
    }
  }

  async sendApproverNotificationMail(
    approverMail: string,
    requesterId: string,
    requesterName: string,
    requestType: string,
  ) {
    try {
      await this.mailService.sendMail({
        from: 'RH-Nandayure',
        to: approverMail,
        subject: `Nueva solicitud de ${requestType}`,
        text: `Se ha creado una nueva solicitud a nombre de ${requesterName}   numero de cédula: ${requesterId} que necesita su aprobación`,
        html: await ApproverNotificationMail(
          requesterId,
          requesterName,
          requestType,
        ),
        attachments: [
          {
            filename: 'MuniLogo',
            path: './src/mail-client/assets/MuniLogo.jpeg',
            cid: 'logoImage',
          },
        ],
      });
    } catch (error) {
      console.error('❌ Error al enviar RequestResolutionMail:', error);
    }
  }

  async sendRequestResolution(
    requesterEmail: string,
    requestType: string,
    approved: boolean,
  ) {
    try {
      await this.mailService.sendMail({
        from: 'RH-Nandayure',
        to: requesterEmail,
        subject: `Respuesta de solicitud de ${requestType}`,
        html: await RequestResolutionMail(approved, requestType),
        attachments: [
          {
            filename: 'MuniLogo',
            path: './src/mail-client/assets/MuniLogo.jpeg',
            cid: 'logoImage',
          },
        ],
      });
    } catch (error) {
      console.error('❌ Error al enviar RequestResolutionMail:', error);
    }
  }
}

// //->
// async sendNewRequestProcessRequesterMail(
//   approverName: string,
//   requesterEmail: string,
//   requesterName: string,
//   requestType: string,
// ) {
//   this.mailService.sendMail({
//     from: 'RRHH-Nandayure',
//     to: requesterEmail,
//     subject: `Su solicitud de ${requestType} está en proceso`,
//     text: `Estimado ${requesterName} en este momento su solicitud está a la espera de de la revision de ${approverName}`,
//     //html: welcomeMail,
//   });
// }
