import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { HangersService } from './hangers.service';
import { Hanger } from 'src/core/entities/hanger';
import { Message } from 'src/core/shared/message';
import { Exception } from 'src/core/shared/exception';
import { AssignHangerDto } from './dtos/assign-hanger.dto';

@Controller('hangers')
export class HangersController {
  constructor(private readonly hangersService: HangersService) {}

  @Get()
  listByLocation(@Query('locationId') locationId : string) {
    return new Promise<Array<Hanger>>((resolve, reject) => {
      this.hangersService.listByLocation(locationId)
      .then((result) => {
        resolve(result);
      }).catch((err : Exception) => {
        reject(err.getException());
      });
    });
  }

  @Post('assign')
  assignHanger(@Body() { qrId, hangerId } : AssignHangerDto) {
    return new Promise<Message>((resolve, reject) => {
      this.hangersService.assign(hangerId, qrId)
      .then((result) => {
        resolve(result);
      }).catch((err : Exception) => {
        reject(err.getException());
      });
    });
  }

  @Post('detach')
  detachHanger(@Body() {hangerId, qrId } : AssignHangerDto) {
    return new Promise<Message>((resolve, reject) => {
      this.hangersService.detach(hangerId, qrId)
      .then((result) => {
        resolve(result);
      }).catch((err : Exception) => {
        reject(err.getException());
      });
    });
  }
}
