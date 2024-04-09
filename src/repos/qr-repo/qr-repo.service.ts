import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Hanger } from 'src/core/entities/hanger';
import { Qr } from 'src/core/entities/qr';
import { AssignEntityExceptionService } from 'src/core/exceptions/assign-entity-exception';
import { CreateEntityException } from 'src/core/exceptions/create-entity-exception';
import { DetachEntityException } from 'src/core/exceptions/detach-entity-exception';
import { DisablingOldQrException } from 'src/core/exceptions/disabling-old-qr-exception';
import { FetchEntityException } from 'src/core/exceptions/fetch-entity-exception';
import { ListEntityException } from 'src/core/exceptions/list-entity-exception';
import { UpdateEntityException } from 'src/core/exceptions/update-entity-exception';

@Injectable()
export class QrRepoService {

    constructor(
        @InjectModel(Qr.name) private model: Model<Qr>
    ) { }

    async listQrsByClubId(clubId: string) {
        try {
            let qrs = await this.model.find({ clubId: new Types.ObjectId(clubId), used: true, active: true });
            return qrs;
        } catch (error) {
            throw new ListEntityException(error);
        }
    }

    async findOne(id: string) {
        try {
            let qr = await this.model.findById(id);
            return qr;
        } catch (error) {
            throw new FetchEntityException(error);
        }
    }

    async assignHanger(qrId: string, qr: Qr) {
        try {
            await this.model.findByIdAndUpdate(qrId, qr);
        } catch (error) {
            throw new AssignEntityExceptionService(error);
        }
    }

    async detachHanger(qrId: string) {
        try {
            await this.model.findByIdAndUpdate(qrId, { $unset: { hanger: 1 } })
        } catch (error) {
            throw new DetachEntityException(error);
        }
    }

    async assignSlot(qrId: string, qr: Partial<Qr>) {
        try {
            await this.model.findByIdAndUpdate(qrId, qr);
        } catch (error) {
            throw new AssignEntityExceptionService(error);
        }
    }

    async detachSlot(qrId: string) {
        try {
            await this.model.findByIdAndUpdate(qrId, { $unset: { slot: 1 } })
        } catch (error) {
            throw new DetachEntityException(error);
        }
    }

    async update(qrId: string, qr: Partial<Qr>) {
        try {
            if (qr.clubId) delete qr.clubId;
            if (qr.orderId) delete qr.orderId;
            let update = await this.model.findByIdAndUpdate(qrId, qr);
            return update;
        } catch (error) {
            throw new UpdateEntityException(error);
        }
    }

    async createQr(qr: Qr) {
        try {
            qr.orderId = new Types.ObjectId(qr.orderId) as any;
            qr.clubId = new Types.ObjectId(qr.clubId) as any;
            return await this.model.create(qr)
        } catch (error) {
            throw new CreateEntityException(error);
        }
    }

    async disableOldQrs() {
        try {
            await this.model.updateMany({}, { $set: { active: false, used: true } });
            return "ok";
        } catch (error) {
            throw new DisablingOldQrException(error);
        }
    }


    async deactivateQrsByClubId(clubId: string) {
        try {

            const updateResult = await this.model.updateMany(
                { clubId: new Types.ObjectId(clubId) },
                { $set: { active: false } }
            );

            return updateResult;
        } catch (error) {
            throw new UpdateEntityException(error);
        }
    }

    async deactivateQr(qrId: string) {
        try {
            let qr = await this.model.findById(qrId);
            if (!qr.hanger && !qr.slot)
                await this.model.findByIdAndUpdate(qrId, { active: false })
        } catch (error) {
            throw error;
        }
    }

}
