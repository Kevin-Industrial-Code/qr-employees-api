import { Injectable } from '@nestjs/common';
import { Qr } from 'src/core/entities/qr';
import { QrRepoService } from 'src/repos/qr-repo/qr-repo.service';

@Injectable()
export class QrsService {

    constructor(
        private qrRepo : QrRepoService
    ) {}

    async listQrs(clubId : string) {
        try {
            let qrs = await this.qrRepo.listQrsByClubId(clubId);
            return qrs;
        } catch (error) {
            throw error;
        }
    }

    async findQr(qrId : string) : Promise<Qr> {
        try {
            let qr = await this.qrRepo.findOne(qrId);
            return qr;
        } catch (error) {
            throw error;
        }
    }
}
