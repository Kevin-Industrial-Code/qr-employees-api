import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Slot } from "./slot";
import mongoose, { HydratedDocument, Mongoose, Types } from "mongoose";
import { Hanger } from "./hanger";

export type QrDocument = HydratedDocument<Qr>;

export type BreakTime = {
    start: Date,
    finish: Date
}

@Schema()
export class Qr {
    _id? : string;
    @Prop({ type: mongoose.Types.ObjectId })
    orderId: string;
    @Prop({ type: mongoose.Types.ObjectId })
    clubId: string;
    @Prop()
    name: string;
    @Prop()
    email: string;
    @Prop()
    photo: string;
    @Prop({ type: Boolean })
    paymentStatus: boolean;
    @Prop({ type: mongoose.Types.Map })
    hanger: Partial<Hanger>;
    @Prop({ type: mongoose.Types.Array })
    services: Array<any>;
    @Prop({ type: Boolean })
    slot: any;
    @Prop({ type: Boolean })
    active: boolean;
    @Prop({ type: Boolean })
    used: boolean;
    @Prop({ type: Boolean })
    entry: boolean;
    @Prop({ type: mongoose.Types.Array })
    breaks: Array<BreakTime>;
    @Prop({ type: String })
    paymentType: string;
    @Prop({ type: Boolean })
    activeBreak: boolean;
    @Prop({ type: Boolean })
    expired: boolean
}
export const QrSchema = SchemaFactory.createForClass(Qr);