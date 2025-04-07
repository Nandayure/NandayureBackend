import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AnaliticsService } from './analitics.service';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/auth-roles/roles.decorator';
import { Role } from 'src/auth/auth-roles/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { GetTopEmployeesMostRequestsDto } from './dto/GetTopEmployeesMostRequestsDto';

@Controller('analitics')
@ApiTags('analitics')
@Roles(Role.RRHH || Role.Mayor)
@UseGuards(RolesGuard, AuthGuard)
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
