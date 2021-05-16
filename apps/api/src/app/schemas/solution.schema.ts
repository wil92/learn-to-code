import * as mongoose from 'mongoose';
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from 'mongoose';

import {Problem} from "./problem.schema";
import {User} from "./user.schema";

export type SolutionDocument = Solution & Document;

@Schema({timestamps: true})
export class Solution {
  @Prop()
  code: string;

  @Prop()
  language: string;

  @Prop()
  status: string;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Problem'})
  problem: Problem

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
  user: User;
}

export const SolutionSchema = SchemaFactory.createForClass(Solution);
