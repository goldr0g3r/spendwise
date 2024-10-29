import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import UserSchema, { UserSchemaObject } from './database/user.schema';
import { databaseConnection } from 'src/common/constants/database';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: UserSchema.name,
          schema: UserSchemaObject,
          collection: 'users',
        },
      ],
      databaseConnection.user,
    ),
    JwtModule.register({}),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository],
})
export class UserModule {}
