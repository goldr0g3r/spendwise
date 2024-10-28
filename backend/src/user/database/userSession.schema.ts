import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { randomUUID, UUID } from 'crypto';
import { ISessionDevice } from 'src/common/interface/user/base/IUserSession';
import { JWTToken } from 'src/common/types/auth';

@Schema({ timestamps: true })
export class UserSessionSchemaDevice implements ISessionDevice {
  @Prop({ required: true, default: (): UUID => randomUUID() })
  deviceId: UUID;

  @Prop({ required: false })
  refreshToken?: JWTToken;
}

export const UserSessionSchemaObject = SchemaFactory.createForClass(
  UserSessionSchemaDevice,
);
