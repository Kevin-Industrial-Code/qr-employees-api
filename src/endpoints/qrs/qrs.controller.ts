import { Controller, Get, Query } from '@nestjs/common';
import { QrsService } from './qrs.service';
import { Qr } from 'src/core/entities/qr';
import { Exception } from 'src/core/shared/exception';

@Controller('qrs')
export class QrsController {
  constructor(private readonly qrsService: QrsService) {}

  @Get()
  listQrs(@Query('clubId') clubId : string) {
    return new Promise<Array<Qr>>((resolve, reject) => {
      this.qrsService.listQrs(clubId)
      .then((result) => {
        resolve(result);
      }).catch((err : Exception) => {
        reject(err.getException());
      });
    })
  }

  @Get(':id')
  getQr(qrId : string) {
    return new Promise<Qr>((resolve, reject) => {
      this.qrsService.findQr(qrId)
      .then((result) => {
        resolve(result);
      }).catch((err : Exception) => {
        reject(err.getException());
      });
    })
  }
}
