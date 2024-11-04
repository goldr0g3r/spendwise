import { Module } from '@nestjs/common';
import { BankAccountService } from './bank-account.service';
import { BankAccountController } from './bank-account.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/user/user.module';
import {
  BankAccountSchema,
  BankAccountSchemaObject,
} from './database/bankAccount.schema';
import { databaseConnection } from 'src/common/constants/database';
import { JwtModule } from '@nestjs/jwt';
import { BankAccountRepository } from './bank-account.repository';

@Module({
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature(
      [
        {
          name: BankAccountSchema.name,
          schema: BankAccountSchemaObject,
          collection: 'bank-accounts',
        },
      ],
      databaseConnection.bankAccount,
    ),
    UserModule,
  ],
  controllers: [BankAccountController],
  providers: [BankAccountService, BankAccountRepository],
})
export class BankAccountModule {}
