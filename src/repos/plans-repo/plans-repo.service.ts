import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Plan } from 'src/core/entities/plan';

@Injectable()
export class PlansRepoService {

    constructor(
        @InjectModel(Plan.name) private model : Model<Plan>
    ) {}

    async create(plan : Partial<Plan>) {
        try {
            await this.model.create(plan);
        } catch (error) {
            throw new InternalServerErrorException("could not create the plan")
        }
    }

    async findOne(id : string) {
        try {
            let plan = await this.model.findById(id);
            return plan;
        } catch (error) {
            throw new InternalServerErrorException("could not create the plan")
        }
    }

    async findAll() {
        try {
            let plans = await this.model.find()
            return plans
        } catch (error) {
            throw new InternalServerErrorException("could not create the plan")
        }
    }

    async update(id : string,  plan : Partial<Plan>) {
        try {
            await this.model.findByIdAndUpdate(id, plan);
        } catch (error) {
            throw new InternalServerErrorException("could not create the plan")
        }
    }

    async remove(id : string) {
        try {
            await this.model.findByIdAndDelete(id);
        } catch (error) {
            throw new InternalServerErrorException("could not create the plan")
        }
    }
}
