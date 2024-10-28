import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export interface IAPIResponse {
  status: boolean;
  message: string;
}

export interface IApiWithDataResponse<T> extends IAPIResponse {
  data: T;
}

export default class APIResponse implements IAPIResponse {
  @ApiProperty({
    title: 'Status',
    type: Boolean,
    example: true,
    description: 'API response status',
  })
  @Expose()
  status: boolean;

  @ApiProperty({
    title: 'Message',
    description: 'API response message',
    example: 'Successfully completed the request',
  })
  @Expose()
  message: string;
}
