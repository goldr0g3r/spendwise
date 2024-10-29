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
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { RefreshTokenGuard } from 'src/common/guards/refreshToken.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Request } from 'express';
import { UUID } from 'crypto';
import { JWTToken } from 'src/common/types/auth';
import { JwtService } from '@nestjs/jwt';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
}
