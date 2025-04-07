import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
//import { Request } from 'express';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login-dto';
import { AuthGuard } from './guards/auth.guard';
import { ChangePasswordDto } from './dto/change-password-dto';
import { ForgotPasswordDto } from './dto/forgot-password-dto';
import { ResetPasswordDto } from './dto/reset-password-dto';
import { TokenGuard } from './guards/token.guard';
import { Roles } from 'src/auth/auth-roles/roles.decorator';
import { Role } from 'src/auth/auth-roles/role.enum';
import { ChangeUserStatusDto } from './dto/change-user-status-dto';
import { RolesGuard } from './guards/roles.guard';
// import { RegisterDto } from './dto/register-dto';
// import { AuthGuard } from './guards/auth.guard';
// import { RolesGuard } from './guards/roles.guard';
// import { Roles } from './auth-roles/roles.decorator';
// import { Role } from './auth-roles/role.enum';
// import { UpdateDto } from './dto/update-dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async Login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  @UseGuards(AuthGuard)
  @Post('change-password')
  async Register(@Req() req, @Body() changePasswordDto: ChangePasswordDto) {
    return await this.authService.changePassword(
      req.user.id,
      changePasswordDto.oldPassword,
      changePasswordDto.newPassword,
    );
  }

  @UseGuards(AuthGuard, TokenGuard)
  @Put('reset-password')
  async resetPassword(@Req() req, @Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(
      req.user.id,
      resetPasswordDto.newPassword,
    );
  }

  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto.Email);
  }

  @UseGuards(AuthGuard)
  @Get('check-email')
  async checkEmail(@Query('email') email: string) {
    const exists = await this.authService.emailExists(email);
    return { exists };
  }

  @UseGuards(AuthGuard)
  @Get('check-id')
  async checkId(@Query('id') id: string) {
    const exists = await this.authService.idExists(id);
    return { exists };
  }
  @Roles(Role.RRHH)
  @UseGuards(RolesGuard)
  @Patch('changeUserStatus')
  async changeUserStatus(@Body() changeUserStatusDto: ChangeUserStatusDto) {
    return await this.authService.changeUserStatus(changeUserStatusDto);
  }

  //Crear endpoind para cambiar contraseña.

  // @Roles(Role.Admin)
  // @UseGuards(AuthGuard, RolesGuard)
  // @UseGuards(AuthGuard)
  // @Get()
  // async SayHi(@Req() request: Request) {
  //   //request trae el payload desencriptado de el guard
  //   const user = (request as any).user; //buscar la forma de agregar tipo aqui y en el guard
  //   return;
  // }

  // @Post('sendMail')
  // async mail() {
  //   return await this.authService.sendMail();
  // }

  // @Post('test')
  // async mail() {
  //   try {
  //     throw new ForbiddenException('mala');
  //   } catch (err) {
  //     throw err;
  //   }
  // }
}
