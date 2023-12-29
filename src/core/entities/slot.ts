import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type SlotDocument = HydratedDocument<Slot>;

@Schema()
export class Slot{
    @Prop() 
    name: string;
    @Prop({ type: Boolean }) 
    status: boolean;
    @Prop({ type: mongoose.Types.ObjectId }) 
    locationId: string;
}
export const slotSchema = SchemaFactory.createForClass(Slot);