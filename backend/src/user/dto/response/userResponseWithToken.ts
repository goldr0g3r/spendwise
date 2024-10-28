import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  IUserResponse,
  IUserResponseWithTokens,
} from 'src/common/interface/user/response/IUserResponse';
import { IJwtTokens } from 'src/common/types/auth';

export class UserResponseWithToken implements IUserResponseWithTokens {
  @ApiProperty({
    title: 'User',
    description: 'User information',
    type: Object,
    example: {
      id: '123e4567-e89b-12d3-a456-426614174000',
      name: 'John Doe',
      username: 'johndoe',
      email: 'johndoe@gmail.com',
    },
  })
  @Expose()
  user: IUserResponse;

  @ApiProperty({
    title: 'Tokens',
    description: 'JWT tokens',
    type: Object,
    example: {
      accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.P0zbLavsA4tNwnBl9IoxK_lXYMWGAHlQmnJdFgv0SuQ',
      refreshToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.P0zbLavsA4tNwnBl9IoxK_lXYMWGAHlQmnJdFgv0SuQ',
    },
  })
  @Expose()
  tokens: IJwtTokens;
}
