import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { randomUUID, UUID } from 'crypto';
import { ICategory } from 'src/common/interface/category/base/ICategory';

@Schema()
export class CategorySchema implements ICategory {
  @Prop({ required: true, unique: true, default: () => randomUUID() })
  id: UUID;

  @Prop({ required: true })
  name: string;

  @Prop()
  icon?: string;

  @Prop()
  color?: string;

  @Prop({ required: true })
  userId: UUID;
}

export const CategorySchemaObject =
  SchemaFactory.createForClass(CategorySchema);
