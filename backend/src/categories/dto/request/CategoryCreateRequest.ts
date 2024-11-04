import { ApiProperty } from '@nestjs/swagger';
import { UUID } from 'crypto';
import { ICreateCategoryRequest } from 'src/common/interface/category/request/ICategoryRequest';

export class CreateCategoryRequest implements ICreateCategoryRequest {
  @ApiProperty({
    title: 'Category Name',
    description: 'Name of the category',
    example: 'Food',
  })
  name: string;

  @ApiProperty({
    title: 'Category Icon',
    description: 'Icon of the category',
    example: 'food',
  })
  icon?: string;

  @ApiProperty({
    title: 'Category Color',
    description: 'Color of the category',
    example: '#ffffff',
  })
  color?: string;

  // @ApiProperty({
  //   title: 'User ID',
  //   description: 'Unique identifier for the user',
  //   example: '123e4567-e89b-12d3-a456-426614174000',
  // })
  // userId: UUID;
}
