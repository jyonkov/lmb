import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { City } from "./City.schema";

@Schema()
export class Localhost {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true, unique: true }) // Assuming email is unique for each local host
    email: string;

    @Prop({ required: false })
    password: string;

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'City' })
    city: City;

    @Prop({ required: false })
    verification_code: number;

    @Prop({ required: false })
    verification_code_created_at: Date;

    @Prop({ default: false })
    code_verified: boolean;

    @Prop({ default: Date.now })
    created_at: Date;

    @Prop({ default: Date.now })
    updated_at: Date;
}

export const LocalhostSchema = SchemaFactory.createForClass(Localhost);