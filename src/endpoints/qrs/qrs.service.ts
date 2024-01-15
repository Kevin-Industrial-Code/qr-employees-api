import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { Qr } from 'src/core/entities/qr';
import { QrRepoService } from 'src/repos/qr-repo/qr-repo.service';

@Injectable()
export class QrsService {

    constructor(
        private qrRepo: QrRepoService
    ) { }

    async listQrs(clubId: string) {
        try {
            let qrs = await this.qrRepo.listQrsByClubId(clubId);
            return qrs;
        } catch (error) {
            throw error;
        }
    }

    async findQr(qrId: string): Promise<Qr> {
        try {
            let qr = await this.qrRepo.findOne(qrId);
            return qr;
        } catch (error) {
            throw error;
        }
    }

    async updateQr(qrId: string, qr: Qr) {
        try {
            let qrData = await this.qrRepo.update(qrId, qr);
            return qrData;
        } catch (error) {
            throw error;
        }
    }

    @Cron("0 0 5 * * *")
    async disableQr() {

    }

    async takeBreakTime() {
        try {

        } catch (error) {
            throw error;
        }
    }
}
