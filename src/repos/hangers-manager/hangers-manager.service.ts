import { Injectable } from '@nestjs/common';
import { EntitiesManager } from '../entities-manager/entities-manager';
import { InjectModel } from '@nestjs/mongoose';
import { Hanger } from 'src/core/entities/hanger';
import { Model } from 'mongoose';
import { UpdateEntityException } from 'src/core/exceptions/update-entity-exception';

@Injectable()
export class HangersManagerService extends EntitiesManager<any> {
    
    constructor(
        @InjectModel(Hanger.name) protected override model : Model<Hanger>
    ) {
        super(model);
    }

    async update(hangerId: string, hanger: Partial<Hanger>) {
        try {
            let update = await this.model.findByIdAndUpdate(hangerId, hanger);
            return update;
        } catch (error) {
            throw new UpdateEntityException(error);
        }
    }
}
