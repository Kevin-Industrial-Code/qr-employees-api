import { Body, Controller, Get, Param, Patch, Query, UseGuards } from '@nestjs/common';
import { QrsService } from './qrs.service';
import { Qr } from 'src/core/entities/qr';
import { Exception } from 'src/core/shared/exception';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/core/guards/auth/auth.guard';
import { Message } from 'src/core/shared/message';

@UseGuards(AuthGuard)
@ApiTags('Qrs')
@Controller('qrs')
export class QrsController {
  constructor(private readonly qrsService: QrsService) { }

  @Get()
  listQrs(@Query('clubId') clubId: string) {
    return new Promise<Array<Qr>>((resolve, reject) => {
      this.qrsService.listQrs(clubId)
        .then((result) => {
          resolve(result);
        }).catch((err: Exception) => {
          reject(err.getException());
        });
    })
  }

  @Get('breaks')
  listAllActiveBreaks() {
    return new Promise<Map<string, any>>((resolve, reject) => {
      this.qrsService.listBreaks()
      .then((result) => {
        resolve(result)
      }).catch((err : Exception) => {
        reject(err.getException());
      });
    });
  }

  @Get(':id')
  getQr(@Param('id') qrId: string) {
    return new Promise<Qr>((resolve, reject) => {
      this.qrsService.findQr(qrId)
        .then((result) => {
          resolve(result);
        }).catch((err: Exception) => {
          reject(err.getException());
        });
    })
  }

  @Patch(':id')
  updateQr(@Param('id') qrId: string, @Body() qr: Qr) {
    return new Promise<any>((resolve, reject) => {
      this.qrsService.updateQr(qrId, qr)
        .then((result) => {
          resolve(result);
        }).catch((err: Exception) => {
          reject(err.getException());
        });
    })
  }

  @Patch("break/:id")
  takeBreak(@Param('id') qrId: string) {
    return new Promise<Message>((resolve, reject) => {
      this.qrsService.takeBreakTime(qrId)
        .then((result: Message) => {
          resolve(result);
        }).catch((err: Exception) => {
          reject(err.getException());
        });
    })
  }

  @Patch("break/stop/:id")
  stopBreak(@Param('id') qrId: string) {
    return new Promise<Message>((resolve, reject) => {
      this.qrsService.stopBreakTime(qrId)
        .then((result: Message) => {
          resolve(result);
        }).catch((err: Exception) => {
          reject(err.getException());
        });
    })
  }
}