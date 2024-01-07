import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument =  HydratedDocument<User>;

@Schema()
export class User {
    @Prop() name: string;
    @Prop() lastName: string;
    @Prop() username: string;
    @Prop() email: string;
    @Prop() password: string;
    @Prop() rol: string;
    @Prop() photoURL: string;
    @Prop() phone: string;
    @Prop() birthDate: string;
    @Prop() nationality: string;
    @Prop() isAnonymous: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
