import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { HangersService } from './hangers.service';
import { Hanger } from 'src/core/entities/hanger';
import { Message } from 'src/core/shared/message';
import { Exception } from 'src/core/shared/exception';
import { AssignHangerDto } from './dtos/assign-hanger.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/core/guards/auth/auth.guard';

@UseGuards(AuthGuard)
@ApiTags('Hangers')
@Controller('hangers')
export class HangersController {
  constructor(private readonly hangersService: HangersService) { }

  @Get()
  listByLocation(@Query('locationId') locationId: string) {
    return new Promise<Array<Hanger>>((resolve, reject) => {
      this.hangersService.listByLocation(locationId)
        .then((result) => {
          resolve(result);
        }).catch((err: Exception) => {
          reject(err)
        });
    });
  }

  @Get(':id')
    async findOne(@Param('id') hangerId: string): Promise<Hanger> {
    return this.hangersService.findOne(hangerId);
  }

  @Post('assign')
  assignHanger(@Body() { qrId, hangerId }: AssignHangerDto) {
    return new Promise<Message>((resolve, reject) => {
      this.hangersService.assign(hangerId, qrId)
        .then((result) => {
          resolve(result);
        }).catch((err: Exception) => {
          reject(err)
        });
    });
  }

  @Post('detach')
  detachHanger(@Body() { hangerId, qrId }: AssignHangerDto) {
    return new Promise<Message>((resolve, reject) => {
      this.hangersService.detach(hangerId, qrId)
        .then((result) => {
          resolve(result);
        }).catch((err: Exception) => {
          reject(err)
        });
    });
  }

  @Patch(':id')
  updateHanger(@Param('id') hangerId: string, @Body() hanger: any) {
    return new Promise<any>((resolve, reject) => {
      this.hangersService.updateHanger(hangerId, hanger)
        .then((result) => {
          resolve(result);
        }).catch((err: Exception) => {
          reject(err);
        });
    })
  }

}
