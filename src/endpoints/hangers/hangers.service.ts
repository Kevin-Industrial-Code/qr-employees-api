import { Injectable } from '@nestjs/common';
import { Hanger } from 'src/core/entities/hanger';
import { Qr } from 'src/core/entities/qr';
import { HangersManagerService } from 'src/repos/hangers-manager/hangers-manager.service';
import { QrRepoService } from 'src/repos/qr-repo/qr-repo.service';

@Injectable()
export class HangersService {
  
  constructor(
    private hangersRepo : HangersManagerService,
    private qrsRepo : QrRepoService
  ) {}

  async listByLocation(locationId : string) : Promise<Array<Hanger>> {
    try {
      let hangers = await this.hangersRepo.list(locationId)
      return hangers;
    } catch (error) {
      throw error;
    }
  }

  async assign(hangerId : string, qrId : string) {
    try {
      let qr : Qr = await this.qrsRepo.findOne(qrId) as Qr;
      let hanger : Hanger = await this.hangersRepo.findOne(hangerId);
      if(qr.hanger) {
        let formerHangerId = qr.hanger['_id'];
        this.hangersRepo.detach(formerHangerId);
        this.qrsRepo.detachHanger(qrId);
      }
      await this.hangersRepo.assign(hangerId);
      qr.hanger = hanger;
      await this.qrsRepo.assignHanger(qrId, qr);
      return { name : "success", message : "hanger associated successfully"};
    } catch (error) {
      throw error;
    }
  }

  async detach(hangerId : string, qrId : string) {
    try {
      await this.qrsRepo.detachHanger(qrId);
      await this.hangersRepo.detach(hangerId);
      return { name : "success", message: "hanger detached successfully"};
    } catch (error) {
      throw error;
    }
  }



}
