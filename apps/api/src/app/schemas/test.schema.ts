import * as mongoose from 'mongoose';
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from 'mongoose';
import {Problem} from "./problem.schema";

export type TestDocument = Test & Document;

@Schema({timestamps: true})
export class Test {
  @Prop()
  name: string;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Problem'})
  problem: Problem
}

export const TestSchema = SchemaFactory.createForClass(Test);
