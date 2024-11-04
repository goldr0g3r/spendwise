import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/user/user.module';
import {
  CategorySchema,
  CategorySchemaObject,
} from './database/Category.schema';
import { databaseConnection } from 'src/common/constants/database';
import { CategoriesRepository } from './categories.repository';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature(
      [
        {
          name: CategorySchema.name,
          schema: CategorySchemaObject,
        },
      ],
      databaseConnection.category,
    ),
    UserModule,
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService, CategoriesRepository],
  exports: [CategoriesRepository],
})
export class CategoriesModule {}
