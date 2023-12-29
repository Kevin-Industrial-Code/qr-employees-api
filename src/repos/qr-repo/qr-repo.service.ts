import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Hanger } from 'src/core/entities/hanger';
import { Qr } from 'src/core/entities/qr';
import { AssignEntityExceptionService } from 'src/core/exceptions/assign-entity-exception';
import { DetachEntityException } from 'src/core/exceptions/detach-entity-exception';
import { FetchEntityException } from 'src/core/exceptions/fetch-entity-exception';
import { ListEntityException } from 'src/core/exceptions/list-entity-exception';

@Injectable()
export class QrRepoService {

    constructor(
        @InjectModel(Qr.name) private model : Model<Qr>
    ) {}

    async listQrsByClubId(clubId : string) {
        try {
            let qrs =  await this.model.find({ clubId: new Types.ObjectId(clubId) });
            return qrs;
        } catch (error) {
            throw new ListEntityException(error);
        }
    }

    async findOne(id : string){
        try {
            let qr = await this.model.findById(id);
            return qr;
        } catch (error) {
            throw new FetchEntityException(error);
        }
    }

    async assignHanger(qrId : string, qr : Qr) {
        try {
            await this.model.findByIdAndUpdate(qrId, qr);
        } catch (error) {
            throw new AssignEntityExceptionService(error);
        }
    }

    async detachHanger(qrId : string) {
        try {
            await this.model.findByIdAndUpdate(qrId, {$unset: {hanger: 1}})
        } catch (error) {
            throw new DetachEntityException(error);
        }
    }

    async assignSlot(qrId : string, qr : Qr) {
        try {
            await this.model.findByIdAndUpdate(qrId, qr);
        } catch (error) {
            throw new AssignEntityExceptionService(error);
        }
    }

    async detachSlot(qrId : string) {
        try {
            await this.model.findByIdAndUpdate(qrId, {$unset: {slot: 1}})
        } catch (error) {
            throw new DetachEntityException(error);
        }
    }
}
