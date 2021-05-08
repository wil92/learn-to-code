import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type ProblemDocument = Problem & Document;

@Schema()
export class Problem {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  inputDescription: string;

  @Prop()
  inputExample: string;

  @Prop()
  outputDescription: string;

  @Prop()
  outputExample: string;
}

export const ProblemSchema = SchemaFactory.createForClass(Problem);
