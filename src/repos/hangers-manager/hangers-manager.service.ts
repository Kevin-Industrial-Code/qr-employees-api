import { Injectable } from '@nestjs/common';
import { EntitiesManager } from '../entities-manager/entities-manager';
import { InjectModel } from '@nestjs/mongoose';
import { Hanger } from 'src/core/entities/hanger';
import { Model } from 'mongoose';

@Injectable()
export class HangersManagerService extends EntitiesManager<any> {
    
    constructor(
        @InjectModel(Hanger.name) protected override model : Model<Hanger>
    ) {
        super(model);
    }
}
