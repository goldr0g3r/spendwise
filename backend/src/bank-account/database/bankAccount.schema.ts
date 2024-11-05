import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { randomUUID, UUID } from 'crypto';
import {
  IBankAccount,
  IBankAccountList,
  ICards,
} from 'src/common/interface/bankAccount/base/IBankAccounts';
import { AccountSchema, AccountSchemaObject } from './account.schema';
import { CardSchema, CardSchemaObject } from './card.schema';

@Schema()
export class BankAccountSchema implements IBankAccountList {
  @Prop({ required: true })
  userId: UUID;

  @Prop({ required: true, type: [AccountSchemaObject] })
  accounts?: AccountSchema[];

  @Prop({ required: true, type: [CardSchemaObject] })
  cards?: CardSchema[];
}

export const BankAccountSchemaObject =
  SchemaFactory.createForClass(BankAccountSchema);
