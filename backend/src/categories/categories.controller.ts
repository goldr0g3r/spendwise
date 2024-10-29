import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesRepository } from './categories.repository';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { CategoryRoutes } from './categories.routes';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { CreateCategoryRequest } from './dto/request/CategoryCreateRequest';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService,
    private categoriesRepository: CategoriesRepository,
  ) {}

  @ApiOperation({ summary: 'Create a new category' })
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth('accessToken')
  @Post(CategoryRoutes.create)
  async CreateCategory(@Body() request: CreateCategoryRequest) {
    return this.categoriesRepository.createCategory(request);
  }
}
