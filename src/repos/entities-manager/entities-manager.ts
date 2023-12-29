import mongoose, { Model } from "mongoose";
import { AssignEntityExceptionService } from "src/core/exceptions/assign-entity-exception";
import { DetachEntityException } from "src/core/exceptions/detach-entity-exception";
import { FetchEntityException } from "src/core/exceptions/fetch-entity-exception";
import { ListEntityException } from "src/core/exceptions/list-entity-exception";

export type entity = {
    status : boolean,
    locationId : string
}

export class EntitiesManager<t extends entity> {

    constructor( protected model : Model<t> ) {}

    async list(locationId : string) {
        try {      
            let entities = await this.model.find({ status: false, locationId: new mongoose.Types.ObjectId(locationId) });
            return entities;
        } catch (error) {
            throw new ListEntityException(error);
        }
    }

    async findOne(id : string) {
        try {
            let entity = await this.model.findById(id);
            return entity;
        } catch (error) {
            throw new FetchEntityException(error);
        }
    }

    async assign(entityId : string) {
        try {
            await this.model.findByIdAndUpdate(entityId, {status: true});
        } catch (error) {
            throw new AssignEntityExceptionService(error);
        }
    }

    async detach(entityId : string) {
        try {
            await this.model.findByIdAndUpdate(entityId, {status: false});
            return "ok";
        } catch (error) {
          throw new DetachEntityException(error);  
        }
    }
}
