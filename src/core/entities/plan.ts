import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type PlanDocument = Document<Plan>;

@Schema({ collection: 'plans' })
export class Plan {
    @Prop()
    planName: string;

    @Prop()
    description: string;

    @Prop()
    numberCustomFields: number;

    @Prop()
    numberLocations: number;

    @Prop()
    iconQrVisible: boolean;

    @Prop()
    functionEntry: boolean;

    @Prop()
    slotsActive: boolean;

    @Prop()
    guestInformation: boolean;

    @Prop()
    multiLocation: boolean;

    @Prop()
    brakeTime: boolean;

    @Prop()
    allowedBrakes: boolean;

    @Prop()
    gatewayPayment: boolean;

}
export const PlanSchema = SchemaFactory.createForClass(Plan);


// import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
// import { HydratedDocument } from "mongoose";

// export type PlanDocument = HydratedDocument<Plan>;

// @Schema()
// export class Plan {
//     @Prop()
//     planName : string;
//     @Prop()
//     clubsLogo: boolean;
//     @Prop()
//     entryFunction: boolean;
//     @Prop()
//     multiLocationEntry: boolean;
//     @Prop()
//     coatFunction: boolean;
//     @Prop()
//     multiLocationCoatChecker: boolean;
//     @Prop()
//     bagOrItemChecker: boolean;
//     @Prop()
//     brakeTime : boolean;
//     @Prop()
//     allowedBrakes: boolean;
//     @Prop()
//     dashboard: boolean;
//     @Prop()
//     guestInfo: boolean;
// }
// export const PlanSchema = SchemaFactory.createForClass(Plan);