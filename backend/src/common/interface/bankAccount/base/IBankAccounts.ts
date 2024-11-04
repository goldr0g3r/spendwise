import { UUID } from 'crypto';
import { TCardType } from 'src/common/types/bankAccount';

export interface IBankAccount {
  bankName: string;
  last4Digits: number;
  accountName: string;
  id: UUID;
}

export interface IBankAccountList {
  accounts: IBankAccount[];
  cards: ICards[];
  userId: UUID;
}
export interface ICards {
  cardnumber: number;
  isCreditCard: boolean;
  cardType: TCardType;
  id: UUID;
}
