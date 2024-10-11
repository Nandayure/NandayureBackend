import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { CreateMailClientDto } from './dto/create-mail-client.dto';
import { WelcomeMail } from './templates/WelcomeMail';
import { RecoverPasswordMail } from './templates/RecoverPasswordMail';
import { RequestConfirmationMail } from './templates/RequestConfirmationMail';
import { ApproverNotificationMail } from './templates/ApproverNotificationMail';
import { RequestResolutionMail } from './templates/RequestResolutionMail';

@Injectable()
export class MailClientService {
  constructor(private readonly mailService: MailerService) {}

  async sendWelcomeMail(createMailClientDto: CreateMailClientDto) {
    this.mailService.sendMail({
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
  }

  async sendRecoverPasswordMail(createMailClientDto: CreateMailClientDto) {
    this.mailService.sendMail({
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
  }

  async sendRequestConfirmationMail(mail: string, requestType: string) {
    this.mailService.sendMail({
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
  }

  async sendApproverNotificationMail(
    approverMail: string,
    requesterId: string,
    requesterName: string,
    requestType: string,
  ) {
    this.mailService.sendMail({
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
  }

  async sendRequestResolution(
    requesterEmail: string,
    requestType: string,
    approved: boolean,
  ) {
    this.mailService.sendMail({
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
