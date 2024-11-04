import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { randomUUID, UUID } from 'crypto';
import { IBankAccount } from 'src/common/interface/bankAccount/base/IBankAccounts';

@Schema()
export class AccountSchema implements IBankAccount {
  @Prop({ required: true })
  bankName: string;
  @Prop({ required: true })
  last4Digits: number;
  @Prop({ required: true })
  accountName: string;
  @Prop({ required: true, unique: true, default: () => randomUUID() })
  id: UUID;
}

export const AccountSchemaObject = SchemaFactory.createForClass(AccountSchema);
