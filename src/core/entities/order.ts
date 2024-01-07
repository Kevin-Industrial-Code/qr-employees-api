import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type OrderDocument = HydratedDocument<Order>;

@Schema()
export class Order {
    @Prop() clubId: string;
    @Prop() date : Date;
    @Prop() creator : string;
    @Prop({ type: Types.Map }) totals : Object;
}

export const OrderSchema = SchemaFactory.createForClass(Order);