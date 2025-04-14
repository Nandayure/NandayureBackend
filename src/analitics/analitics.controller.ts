import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AnaliticsService } from './analitics.service';
import { ApiTags } from '@nestjs/swagger';

import { AuthGuard } from 'src/auth/guards/auth.guard';
import { GetTopEmployeesMostRequestsDto } from './dto/GetTopEmployeesMostRequestsDto';
import { Roles } from 'src/auth/auth-roles/roles.decorator';
import { Role } from 'src/auth/auth-roles/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('analitics')
@ApiTags('analitics')
@UseGuards(AuthGuard, RolesGuard)
@Roles(Role.RRHH || Role.Mayor)
export class AnaliticsController {
  constructor(private readonly analiticsService: AnaliticsService) {}

  @Get('requestsSummary')
  getRequestsSummary() {
    return this.analiticsService.getRequestsSummary();
  }

  @Get('DatesWithRequests')
  test() {
    return this.analiticsService.avaiableMonthsAndYears();
  }
  @Post('employeesWithMostRequests')
  getRequest(
    @Body()
    getTopEmployeesWithMostRequestsDto: GetTopEmployeesMostRequestsDto,
  ) {
    return this.analiticsService.employeesWithMostRequests(
      getTopEmployeesWithMostRequestsDto,
    );
  }

  @Get('peak-request-times')
  async getPeakRequestTimes() {
    return this.analiticsService.getPeakRequestTimes();
  }
}
