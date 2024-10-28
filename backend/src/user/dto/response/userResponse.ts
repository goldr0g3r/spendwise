import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { randomUUID, UUID } from 'crypto';
import { IUserResponse } from 'src/common/interface/user/response/IUserResponse';

export class UserResponse implements IUserResponse {
  @ApiProperty({
    title: 'User ID',
    description: 'Unique identifier of the user',
    example: (): UUID => randomUUID(),
  })
  @Expose()
  id: UUID;

  @ApiProperty({
    title: 'name',
    description: 'Name of the user',
    example: 'John Doe',
  })
  @Expose()
  name: string;

  @ApiProperty({
    title: 'username',
    description: 'Username of the user',
    example: 'johndoe',
  })
  @Expose()
  username: string;

  @ApiProperty({
    title: 'email',
    description: 'Email of the user',
    example: 'johndoe@gmail.com',
  })
  @Expose()
  email: string;
}
