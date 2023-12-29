import { Injectable } from '@nestjs/common';
import { Slot } from 'src/core/entities/slot';
import { EntitiesManager } from '../entities-manager/entities-manager';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class SlotsManagerService  extends EntitiesManager<any> {

    constructor(
        @InjectModel(Slot.name) protected override model : Model<Slot>
    ) {
        super(model);
    }
}
