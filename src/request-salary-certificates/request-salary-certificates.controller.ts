import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RequestSalaryCertificatesService } from './request-salary-certificates.service';
import { CreateRequestSalaryCertificateDto } from './dto/create-request-salary-certificate.dto';
import { UpdateRequestSalaryCertificateDto } from './dto/update-request-salary-certificate.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
@ApiTags('request-salary-certificates')
@Controller('request-salary-certificates')
export class RequestSalaryCertificatesController {
  constructor(
    private readonly requestSalaryCertificatesService: RequestSalaryCertificatesService,
  ) {}
  @UseGuards(AuthGuard)
  @Post()
  create(
    @Req() req,
    @Body()
    createRequestSalaryCertificateDto: CreateRequestSalaryCertificateDto,
  ) {
    return this.requestSalaryCertificatesService.create(
      createRequestSalaryCertificateDto,
      req.user.id,
    );
  }

  @Get()
  findAll() {
    return this.requestSalaryCertificatesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.requestSalaryCertificatesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body()
    updateRequestSalaryCertificateDto: UpdateRequestSalaryCertificateDto,
  ) {
    return this.requestSalaryCertificatesService.update(
      +id,
      updateRequestSalaryCertificateDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.requestSalaryCertificatesService.remove(+id);
  }
}
