import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Model } from 'mongoose';
import { Slot } from 'src/core/entities/slot';
import { ListEntityException } from 'src/core/exceptions/list-entity-exception';

@Injectable()
export class LocationsRepoService {

    constructor(
        @InjectModel(Location.name) private location : Model<Location>,
        @InjectModel(Slot.name) private slot : Model<Slot>
    ){}

    async countSlotsInLocation(locationId : string) {
        try {
            let count = this.slot.find({ locationId: new Types.ObjectId(locationId) }).countDocuments();
            console.log(count);
            return count;
        } catch (error) {
            throw new ListEntityException(error);
        }
    }
}
