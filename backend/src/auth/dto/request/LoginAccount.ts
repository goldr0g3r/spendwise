import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { ILoginAccount } from 'src/common/interface/user/request/ILoginAccount';

export class LoginAccount implements ILoginAccount {
  @ApiProperty({
    title: 'username',
    description: 'Username of the user',
    example: 'johndoe',
  })
  @Expose()
  username: string;

  @ApiProperty({
    title: 'password',
    description: 'Password of the user',
    example: 'password',
  })
  @Expose()
  password: string;
}
