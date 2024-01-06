import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Model } from 'mongoose';
import { Location } from 'src/core/entities/location';
import { Slot } from 'src/core/entities/slot';
import { ListEntityException } from 'src/core/exceptions/list-entity-exception';

@Injectable()
export class LocationsRepoService {

    constructor(
        @InjectModel(Location.name) private locationRepo : Model<Location>,
        @InjectModel(Slot.name) private slot : Model<Slot>
    ){}

    async countSlotsInLocation(locationId : string) {
        try {
            let count = this.slot.find({ locationId: new Types.ObjectId(locationId) }).countDocuments();
            return count;
        } catch (error) {
            throw new ListEntityException(error);
        }
    }
}
