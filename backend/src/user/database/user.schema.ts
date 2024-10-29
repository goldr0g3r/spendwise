import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { randomUUID, UUID } from 'crypto';
import { IUser } from 'src/common/interface/user/base/IUser';
import * as PassportLocalMongoose from 'passport-local-mongoose';
import {
  ISessionDevice,
  IUserSession,
} from 'src/common/interface/user/base/IUserSession';
import {
  UserSessionSchemaDevice,
  UserSessionSchemaObject,
} from './userSession.schema';
import { Roles } from 'src/common/types/roles';
import { JWTToken } from 'src/common/types/auth';

@Schema()
export default class UserSchema implements IUser, IUserSession {
  @Prop({ required: true, unique: true, default: (): UUID => randomUUID() })
  id: UUID;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ type: [UserSessionSchemaObject], required: true, default: [] })
  sessions: UserSessionSchemaDevice[];

  @Prop({ required: true, default: '', type: [String] })
  roles: Roles[];
}

export const UserSchemaObject = SchemaFactory.createForClass(UserSchema).plugin(
  PassportLocalMongoose,
);
