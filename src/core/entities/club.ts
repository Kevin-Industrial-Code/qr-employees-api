import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Service } from "./service";
import mongoose, { HydratedDocument } from "mongoose";

export type clubDocument = HydratedDocument<Club>

@Schema({ collection: 'clubs' })
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
    @Prop() withItem: boolean;
    @Prop({ default: false }) emailForgottenItems: boolean;
    @Prop() services: Array<Service>;
    @Prop({ type: mongoose.Types.ObjectId }) 
    adminId: string;
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Plan' })
    plan: mongoose.Schema.Types.ObjectId;
}

export const clubSchema = SchemaFactory.createForClass(Club);