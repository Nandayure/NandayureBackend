import {
  Controller,
  Get,
  Param,
  Delete,
  UseGuards,
  Query,
  Req,
  Patch,
  Body,
} from '@nestjs/common';
import { RequestsService } from './requests.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { GetRequestsQueryDto } from './dto/get-requests-query.dto';
import { Roles } from 'src/auth/auth-roles/roles.decorator';
import { Role } from 'src/auth/auth-roles/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CancelRequestDto } from './dto/cancell-request.dto';
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

  @Get('MyRequests')
  findAllRequest(@Req() req, @Query() query: GetRequestsQueryDto) {
    return this.requestsService.findAllRequestByEmployee(req.user.id, query);
  }

  @Patch('CancelRequest/:id')
  cancelRequest(
    @Param('id') id: string,
    @Body() cancelRequestDto: CancelRequestDto,
    @Req() req,
  ) {
    return this.requestsService.cancelRequest(
      +id,
      cancelRequestDto,
      req.user.id,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.requestsService.remove(+id);
  }
}
