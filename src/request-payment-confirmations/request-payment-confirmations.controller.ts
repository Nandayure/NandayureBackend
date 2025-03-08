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
import { RequestPaymentConfirmationsService } from './request-payment-confirmations.service';
import { CreateRequestPaymentConfirmationDto } from './dto/create-request-payment-confirmation.dto';
import { UpdateRequestPaymentConfirmationDto } from './dto/update-request-payment-confirmation.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@ApiTags('request-payment-confirmations')
@Controller('request-payment-confirmations')
@UseGuards(AuthGuard)
export class RequestPaymentConfirmationsController {
  constructor(
    private readonly requestPaymentConfirmationsService: RequestPaymentConfirmationsService,
  ) {}

  @Post()
  create(
    @Req() req,
    @Body()
    createRequestPaymentConfirmationDto: CreateRequestPaymentConfirmationDto,
  ) {
    return this.requestPaymentConfirmationsService.create(
      createRequestPaymentConfirmationDto,
      req.user.id,
    );
  }

  @Get()
  findAll() {
    return this.requestPaymentConfirmationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.requestPaymentConfirmationsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body()
    updateRequestPaymentConfirmationDto: UpdateRequestPaymentConfirmationDto,
  ) {
    return this.requestPaymentConfirmationsService.update(
      +id,
      updateRequestPaymentConfirmationDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.requestPaymentConfirmationsService.remove(+id);
  }
}
