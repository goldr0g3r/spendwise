import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { randomUUID, UUID } from 'crypto';
import { ICards } from 'src/common/interface/bankAccount/base/IBankAccounts';
import { TCardType } from 'src/common/types/bankAccount';

@Schema()
export class CardSchema implements ICards {
  @Prop({ required: true })
  cardnumber: number;

  @Prop({ required: true })
  isCreditCard: boolean;

  @Prop({ required: true, type: String })
  cardType: TCardType;

  @Prop({ required: true, unique: true, default: () => randomUUID() })
  id: UUID;
}

export const CardSchemaObject = SchemaFactory.createForClass(CardSchema);
