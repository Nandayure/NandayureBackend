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
import { GetUsersQueryDto } from 'src/users/dto/GetUsersQueryDto';
import { UpdateUserRolesDto } from './dto/update-user-roles.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.TI)
  @Get('getAllUsersWithFilters')
  async getAllUsersWithFilters(@Query() query: GetUsersQueryDto) {
    return await this.authService.getAllUsersWithFilters(query);
  }

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

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.TI)
  @Patch('changeUserStatus')
  async changeUserStatus(@Body() changeUserStatusDto: ChangeUserStatusDto) {
    return await this.authService.changeUserStatus(changeUserStatusDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.TI)
  @Post('addRoleToUser')
  async addRoleToUser(@Body() updateUserRolesDto: UpdateUserRolesDto) {
    const { userId, roleId } = updateUserRolesDto;
    return await this.authService.addRoleToUser(userId, roleId);
  }
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.TI)
  @Post('removeRoleToUser')
  async removeRoleToUser(@Body() updateUserRolesDto: UpdateUserRolesDto) {
    const { userId, roleId } = updateUserRolesDto;
    return await this.authService.removeRoleToUser(userId, roleId);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  async getCurrentUser(@Req() req) {
    const tokenRoles: Role[] = req.user.roles;
    const userId = req.user.id;

    return await this.authService.authMe(userId, tokenRoles);
  }
}
