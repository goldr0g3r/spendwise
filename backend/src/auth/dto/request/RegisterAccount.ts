import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IRegisterAccount } from 'src/common/interface/user/request/IRegisterAccount';

export class RegisterAccount implements IRegisterAccount {
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

  @ApiProperty({
    title: 'password',
    description: 'Password of the user',
    example: 'password',
  })
  @Expose()
  password: string;
}
