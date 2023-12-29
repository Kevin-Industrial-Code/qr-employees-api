import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Slot } from "./slot";
import mongoose, { HydratedDocument, Types } from "mongoose";
import { Hanger } from "./hanger";

export type QrDocument = HydratedDocument<Qr>;



@Schema()
export class Qr {
    @Prop({ type: mongoose.Types.ObjectId })
    orderId: string;
    @Prop({ type: mongoose.Types.ObjectId })
    clubId : string;
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
    @Prop({ type: mongoose.Types.Map })
    slot: Slot
    
}
export const QrSchema = SchemaFactory.createForClass(Qr);