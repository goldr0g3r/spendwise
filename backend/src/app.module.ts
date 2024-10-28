import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { databaseConnection } from './common/constants/database';
import { ConfigModule } from '@nestjs/config';
import { registerConfig } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [registerConfig]
    }),
    MongooseModule.forRootAsync({
      connectionName: databaseConnection.user,
      useFactory: () => ({
        uri: 'mongodb://localhost:27017/',
        dbName: databaseConnection.user,
        retryWrites: true,
        writeConcern: {
          w: 'majority',
          j: true,
        },
      }),
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
