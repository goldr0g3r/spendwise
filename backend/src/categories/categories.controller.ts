import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesRepository } from './categories.repository';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CategoryRoutes, CatParentRoute } from './categories.routes';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { CreateCategoryRequest } from './dto/request/CategoryCreateRequest';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Request } from 'express';
import { JWTToken } from 'src/common/types/auth';

@ApiTags('categories')
@Controller(CatParentRoute)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiOperation({ summary: 'Create a new category' })
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth('accessToken')
  @Post(CategoryRoutes.create)
  async CreateCategory(
    @Body() request: CreateCategoryRequest,
    @Req() req: Request,
  ) {
    const accessToken = req.headers['authorization'].split(' ')[1] as JWTToken;
    return this.categoriesService.createCategory(request, accessToken);
  }

  @ApiOperation({ summary: 'List all categories' })
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth('accessToken')
  @Get(CategoryRoutes.list)
  async ListCategories(@Req() req: Request) {
    const accessToken = req.headers['authorization'].split(' ')[1] as JWTToken;
    return this.categoriesService.listCategoriesByUser(accessToken);
  }
}
