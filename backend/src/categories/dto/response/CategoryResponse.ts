import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { UUID } from 'crypto';
import { ICategory } from 'src/common/interface/category/base/ICategory';

export class CategoryResponse implements ICategory {
  @ApiProperty({
    title: 'Category ID',
    description: 'Unique identifier for the category',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Expose()
  id: UUID;

  @ApiProperty({
    title: 'Category Name',
    description: 'Name of the category',
    example: 'Food',
  })
  @Expose()
  name: string;

  @ApiProperty({
    title: 'Category Icon',
    description: 'Icon of the category',
    example: 'food',
  })
  @Expose()
  icon?: string;

  @ApiProperty({
    title: 'Category Color',
    description: 'Color of the category',
    example: '#ffffff',
  })
  @Expose()
  color?: string;

  @ApiProperty({
    title: 'User ID',
    description: 'Unique identifier for the user',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Expose()
  userId: UUID;
}

export class CategoryResponseList {
  @ApiProperty({
    title: 'Category List',
    description: 'List of categories',
    type: [CategoryResponse],
  })
  @Expose()
  categories: CategoryResponse[];
}
