import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
@Schema()
export class User {
  @Prop({ required: true, unique: true })
  pseudo: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  dateOfBirth: Date;

  @Prop({ required: true, default: Date.now })
  creationDate: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
type UserDocument = User & Document;
export type UserModel = Model<UserDocument>;
