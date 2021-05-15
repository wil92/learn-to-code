import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  salt: string;

  @Prop()
  role: string;

  @Prop()
  email: string;

  @Prop()
  active: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
