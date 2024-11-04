import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { BankAccountService } from './bank-account.service';
import { JwtService } from '@nestjs/jwt';
import { BankAccountRepository } from './bank-account.repository';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UUID } from 'crypto';
export class CreateBankAccount {
  bankName: string;
  last4Digits: number;
  accountName: string;
  userId: UUID;
}
@Controller('bank-account')
export class BankAccountController {
  constructor(
    private readonly bankAccountService: BankAccountService,
    private bankAccountRepository: BankAccountRepository,
  ) {}
}
