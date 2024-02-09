import { Injectable } from '@nestjs/common';
import { Qr } from 'src/core/entities/qr';
import { Slot } from 'src/core/entities/slot';
import { QrRepoService } from 'src/repos/qr-repo/qr-repo.service';
import { SlotsManagerService } from 'src/repos/slots-manager/slots-manager.service';

@Injectable()
export class SlotsService {

  constructor(
    private slotsRepo: SlotsManagerService,
    private qrsRepo: QrRepoService
  ) { }

  async listByLocation(locationId: string): Promise<Array<Slot>> {
    try {
      let slots = await this.slotsRepo.list(locationId)
      return slots;
    } catch (error) {
      throw error;
    }
  }

  async assign(slotId: string, qrId: string) {
    try {
      let qr: Qr = await this.qrsRepo.findOne(qrId) as Qr;
      let slot: Slot = await this.slotsRepo.findOne(slotId);
      if (qr.slot) {
        let formerslotId = qr.slot['_id'];
        this.slotsRepo.detach(formerslotId);
        this.qrsRepo.detachSlot(qrId);
      }
      await this.slotsRepo.assign(slotId);
      qr.slot = slot;
      await this.qrsRepo.assignSlot(qrId, qr);
      return { name: "success", message: "hanger associated successfully" };
    } catch (error) {
      throw error;
    }
  }

  async detach(slotId: string, qrId: string) {
    try {
      await this.qrsRepo.detachSlot(qrId);
      await this.slotsRepo.detach(slotId);
      await this.qrsRepo.checkQr(qrId);
      return { name: "success", message: "slot detached successfully" };
    } catch (error) {
      throw error;
    }
  }

}
