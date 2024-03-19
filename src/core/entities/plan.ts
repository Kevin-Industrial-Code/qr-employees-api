import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type PlanDocument = HydratedDocument<Plan>;

@Schema()
export class Plan {
    @Prop()
    planName : string;
    @Prop()
    clubsLogo: boolean;
    @Prop()
    entryFunction: boolean;
    @Prop()
    multiLocationEntry: boolean;
    @Prop()
    coatFunction: boolean;
    @Prop()
    multiLocationCoatChecker: boolean;
    @Prop()
    bagOrItemChecker: boolean;
    @Prop()
    brakeTime : boolean;
    @Prop()
    allowedBrakes: boolean;
    @Prop()
    dashboard: boolean;
    @Prop()
    guestInfo: boolean;
}
export const PlanSchema = SchemaFactory.createForClass(Plan);