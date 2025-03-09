import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AnaliticsService } from './analitics.service';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/auth-roles/roles.decorator';
import { Role } from 'src/auth/auth-roles/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('analitics')
@ApiTags('analitics')
// @Roles(Role.RRHH)
// @UseGuards(RolesGuard, AuthGuard)
export class AnaliticsController {
  constructor(private readonly analiticsService: AnaliticsService) {}

  @Get('requestsSummary')
  getRequestsSummary() {
    return this.analiticsService.getRequestsSummary();
  }
}
