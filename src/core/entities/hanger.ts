import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type HangerDocument = HydratedDocument<Hanger>;

@Schema()
export class Hanger {
    @Prop() 
    name: string;
    @Prop({ type: mongoose.Types.ObjectId }) 
    locationId: string;
    @Prop({type: Boolean}) 
    status: string;
}
export const hangerSchema = SchemaFactory.createForClass(Hanger);