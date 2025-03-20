import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { databaseConnection } from './common/constants/database';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Environment, registerConfig } from './config';
import { CategoriesModule } from './categories/categories.module';
import { envConfigToken } from './common/constants/envToken';
import { GoalsModule } from './goals/goals.module';
import { TransactionModule } from './transaction/transaction.module';
import { BudgetModule } from './budget/budget.module';
import { BankAccountModule } from './bank-account/bank-account.module';
import { LoggerModule } from './helpers/logger/Logger.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [registerConfig],
    }),
    LoggerModule,
    MongooseModule.forRootAsync({
      connectionName: databaseConnection.user,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<Environment>(envConfigToken).mongoURI,
        dbName: config.get<Environment>(envConfigToken).userDb,
        retryWrites: true,
        writeConcern: {
          w: 'majority',
          j: true,
        },
      }),
    }),
    MongooseModule.forRootAsync({
      connectionName: databaseConnection.category,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<Environment>(envConfigToken).mongoURI,
        dbName: config.get<Environment>(envConfigToken).categoriesDb,
        retryWrites: true,
        writeConcern: {
          w: 'majority',
          j: true,
        },
      }),
    }),
    MongooseModule.forRootAsync({
      connectionName: databaseConnection.bankAccount,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<Environment>(envConfigToken).mongoURI,
        dbName: config.get<Environment>(envConfigToken).bankDb,
        retryWrites: true,
        writeConcern: {
          w: 'majority',
          j: true,
        },
      }),
    }),
    UserModule,
    AuthModule,
    CategoriesModule,
    GoalsModule,
    TransactionModule,
    BudgetModule,
    BankAccountModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
