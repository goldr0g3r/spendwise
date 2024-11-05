import { Body, Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { BankAccountService } from './bank-account.service';
import { JwtService } from '@nestjs/jwt';
import { BankAccountRepository } from './bank-account.repository';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UUID } from 'crypto';
import { Request } from 'express';
export class CreateBankAccount {
  bankName: string;
  last4Digits: number;
  accountName: string;
  id: undefined;
}
@Controller('bank-account')
export class BankAccountController {
  constructor(
    private readonly bankAccountService: BankAccountService,
    private bankAccountRepository: BankAccountRepository,
  ) {}

  @Post('add-account/:userId')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth('accessToken')
  async addAccount(
    @Body() bankAccount: CreateBankAccount,
    @Req() req: Request,
    @Param('userId') userId: UUID,
  ) {
    console.log('userId', userId);
    return this.bankAccountRepository.addAccount(userId, bankAccount);
  }
}
