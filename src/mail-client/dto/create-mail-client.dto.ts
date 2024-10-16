export class CreateMailClientDto {
  to: string;

  subject: string;

  message?: string;

  EmployeeId?: string;

  Password?: string;

  LoginURL?: string;

  RecoverPasswordURL?: string;
}
