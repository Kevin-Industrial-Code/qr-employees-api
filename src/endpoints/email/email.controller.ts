import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EmailService } from './email.service';
import { AuthGuard } from 'src/core/guards/auth/auth.guard';

export interface mail {
    email: string;
    clientName: string,
    urlImage: string;
  }
  
@ApiTags('email')
@UseGuards(AuthGuard)
@Controller('email')
export class EmailController {

  constructor(
    private readonly emailService: EmailService
    ) {}

  @Post('sendEmail')
  createNewOrder(@Body() mailDTO: mail) {
    return this.emailService.sendEmail(mailDTO);
  }
}
