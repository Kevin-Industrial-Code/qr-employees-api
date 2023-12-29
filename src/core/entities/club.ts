import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Service } from "./service";
import mongoose, { HydratedDocument } from "mongoose";

export type clubDocument = HydratedDocument<Club>

@Schema({ collection: 'clubes' })
export class Club {
    @Prop() name: string;
    @Prop() icon: string;
    @Prop() photo: string;
    @Prop() customNote: string;
    @Prop() closingHour: string;
    @Prop() openingHour: string;
    @Prop() breakTime: number;
    @Prop() breakNumber: number;
    @Prop() withGateway: boolean;
    @Prop() withCash: boolean;
    @Prop() services: Array<Service>;
    @Prop({ type: mongoose.Types.ObjectId }) adminId: string;
}

export const clubSchema = SchemaFactory.createForClass(Club);