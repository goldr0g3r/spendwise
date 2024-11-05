import {
  BadRequestException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { MongoRepository } from 'src/helpers/repository';
import { BankAccountSchema } from './database/bankAccount.schema';
import { databaseConnection } from 'src/common/constants/database';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserRepository } from 'src/user/user.repository';
import { IBankAccount } from 'src/common/interface/bankAccount/base/IBankAccounts';
import { UUID } from 'crypto';

@Injectable()
export class BankAccountRepository extends MongoRepository {
  constructor(
    @InjectModel(BankAccountSchema.name, databaseConnection.bankAccount)
    private bankAccountModel: Model<BankAccountSchema>,
    private userRepository: UserRepository,
  ) {
    super();
  }

  async addAccount(userId, bankAccount: IBankAccount) {
    const user = await this.userRepository.findUserById(userId);
    if (!user) {
      throw new UnprocessableEntityException('User not found');
    }
    const bankAccounts = await this.bankAccountModel.findOne({
      userId: userId,
    });
    if (!bankAccounts) {
      const newBankAccount = await this.bankAccountModel.create({
        userId: userId,
        accounts: [bankAccount],
      });
      await newBankAccount.save();
      return true;
    }
    bankAccounts.accounts.push(bankAccount);
    await bankAccounts.save();
    // const newBankAccount = new this.bankAccountModel({
    //   userId: userId,
    //   accounts: [bankAccount],
    // });

    // await newBankAccount.save();
    return true;
  }
}
