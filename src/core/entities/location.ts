import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type locationDocument = HydratedDocument<Location>;

@Schema()
export class Location {
  @Prop() locationType: string;
  @Prop() name: string;
  @Prop() numberOfHangers: number;
  @Prop() numberSlots: number;
  @Prop() status: boolean;
  @Prop({ type: mongoose.Types.ObjectId })
  clubId: string;
} 
export const locationSchema = SchemaFactory.createForClass(Location);