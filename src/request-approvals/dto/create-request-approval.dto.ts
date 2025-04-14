export class CreateRequestApprovalDto {
  approverId: string; //Person who acept or reject the request
  // Name: string;
  // Surname1: string;
  // Surname2: string;
  requesterId: string; // Person who make the request

  current?: boolean;

  processNumber: number;

  approved?: boolean;

  RequestId: number;

  ApprovedDate?: Date;

  observation?: string;
}
