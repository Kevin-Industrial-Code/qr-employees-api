import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { SlotsService } from './slots.service';
import { Slot } from 'src/core/entities/slot';
import { Exception } from 'src/core/shared/exception';
import { Message } from 'src/core/shared/message';
import { AssignSlotDto } from './dtos/assign-slot.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/core/guards/auth/auth.guard';

@UseGuards(AuthGuard)
@ApiTags('Slots')
@Controller('slots')
export class SlotsController {
  constructor(private readonly slotsService: SlotsService) {}

  @Get()
  listByLocation(@Query('locationId') locationId : string) {
    return new Promise<Array<Slot>>((resolve, reject) => {
      this.slotsService.listByLocation(locationId)
      .then((result) => {
        resolve(result);
      }).catch((err : Exception) => {
        reject(err);
      });
    });
  }

  @Post('assign')
  assignSlot(@Body() { qrId, slotId } : AssignSlotDto) {
    return new Promise<Message>((resolve, reject) => {
      this.slotsService.assign(slotId, qrId)
      .then((result) => {
        resolve(result);
      }).catch((err : Exception) => {
        reject(err);
      });
    });
  }

  @Post('detach')
  detachHanger(@Body() { qrId, slotId } : AssignSlotDto) {
    return new Promise<Message>((resolve, reject) => {
      this.slotsService.detach(slotId, qrId)
      .then((result) => {
        resolve(result)
      }).catch((err : Exception) => {
        reject(err);
      });
    });
  }
}
