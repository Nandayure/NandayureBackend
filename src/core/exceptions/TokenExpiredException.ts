import { HttpException } from '@nestjs/common';

export class TokenExpiredException extends HttpException {
  constructor() {
    super({ error: 'token_expired', message: 'El token ha expirado.' }, 498);
  }
}
