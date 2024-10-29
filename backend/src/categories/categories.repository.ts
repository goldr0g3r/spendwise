import {
  BadRequestException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ICreateCategoryRequest } from 'src/common/interface/category/request/ICategoryRequest';
import { MongoRepository } from 'src/helpers/repository';
import { CategorySchema } from './database/Category.schema';
import { databaseConnection } from 'src/common/constants/database';
import { UUID } from 'crypto';
import { Model } from 'mongoose';
import { UserRepository } from 'src/user/user.repository';
import { plainToClass } from 'class-transformer';
import {
  CategoryResponse,
  CategoryResponseList,
} from './dto/response/CategoryResponse';

@Injectable()
export class CategoriesRepository extends MongoRepository {
  constructor(
    @InjectModel(CategorySchema.name, databaseConnection.category)
    private categoryModel: Model<CategorySchema>,
    private userRepository: UserRepository,
  ) {
    super();
  }

  async createCategory(category: ICreateCategoryRequest) {
    try {
      const user = await this.userRepository.findUserById(category.userId);
      if (!user) {
        throw new UnprocessableEntityException('User not found');
      }
      if (typeof user === 'string') {
        throw new UnprocessableEntityException(user);
      }
      const newCategory = await this.categoryModel.create(category);
      return this.toCategoryModel(newCategory);
    } catch (error) {
      throw new BadRequestException(error.message.toString());
    }
  }

  async findCategoryById(id: string) {
    try {
      const category = await this.categoryModel.findById(id);
      if (!category) {
        throw new UnprocessableEntityException('Category not found');
      }
      return this.toCategoryModel(category);
    } catch (error) {
      throw new BadRequestException(error.message.toString());
    }
  }

  async listCategoriesByUser(userId: UUID) {
    try {
      const categories = await this.categoryModel.find({ userId });
      return await this.toCategoryList(categories);
    } catch (error) {
      throw new BadRequestException(error.message.toString());
    }
  }

  private toCategoryModel(category: CategorySchema) {
    return plainToClass(CategoryResponse, category, {
      excludeExtraneousValues: true,
    });
  }

  private toCategoryList(category: CategorySchema[]) {
    return plainToClass(CategoryResponseList, category, {
      excludeExtraneousValues: true,
    });
  }
}
