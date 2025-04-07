import {
  Controller,
  Get,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { RequestsService } from './requests.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { GetRequestsQueryDto } from './dto/get-requests-query.dto';
import { Roles } from 'src/auth/auth-roles/roles.decorator';
import { Role } from 'src/auth/auth-roles/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
@ApiTags('requests')
@Controller('requests')
@UseGuards(AuthGuard)
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  @Roles(Role.RRHH)
  @UseGuards(RolesGuard)
  @Get()
  findAll(@Query() query: GetRequestsQueryDto) {
    return this.requestsService.findAll(query);
  }

  //crear paginacion y filtros
  @Get('/:EmployeeId')
  findAllRequest(
    @Param('EmployeeId') EmployeeId: string,
    @Query() query: GetRequestsQueryDto,
  ) {
    return this.requestsService.findAllRequestByEmployee(EmployeeId, query);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.requestsService.findOne(+id);
  // }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.requestsService.remove(+id);
  }
}
