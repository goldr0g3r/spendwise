import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { PassportLocalModel, PassportLocalSchema } from 'mongoose';
import { MongoRepository } from 'src/helpers/repository';
import UserSchema from './database/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { databaseConnection } from 'src/common/constants/database';
import { plainToClass } from 'class-transformer';
import { UserResponse } from './dto/response/userResponse';
import { UUID } from 'crypto';
import { IRegisterAccount } from 'src/common/interface/user/request/IRegisterAccount';
import { DEFAULT_ROLES } from 'src/common/types/roles';
import { ILoginAccount } from 'src/common/interface/user/request/ILoginAccount';
import { UserRolesResponse } from './dto/response/userRole.response';
import UserSessionResponse from './dto/response/userSessionResponse';
import { ISessionDevice } from 'src/common/interface/user/base/IUserSession';
import { JWTToken } from 'src/common/types/auth';
import { use } from 'passport';

@Injectable()
export class UserRepository extends MongoRepository {
  constructor(
    @InjectModel(UserSchema.name, databaseConnection.user)
    private userModel: PassportLocalModel<UserSchema>,
  ) {
    super();
  }

  async registerAccount(request: IRegisterAccount) {
    try {
      const user = await this.userModel.register(
        {
          id: undefined,
          username: request.username,
          name: request.name,
          email: request.email,
          sessions: [],
          roles: DEFAULT_ROLES,
        },
        request.password,
      );

      const userResponse = this.toUserModel(user);
      return userResponse;
    } catch (error) {
      throw new BadRequestException(error.message.toString());
    }
  }

  async addRefreshToken(
    userId: UUID,
    session: ISessionDevice,
  ): Promise<boolean> {
    try {
      const user = await this.userModel.findOne({ id: userId });
      if (!user) return false;

      const found = user.sessions.findIndex(
        (s) => s.deviceId === session.deviceId,
      );
      if (found !== -1) {
        user.sessions[found].refreshToken = session.refreshToken;
      } else {
        user.sessions.push(session);
      }
      await user.save();

      return true;
    } catch (error) {
      throw new BadRequestException(error.message.toString());
    }
  }

  async loginAccount(request: ILoginAccount) {
    try {
      const { user, error } = await this.userModel.authenticate()(
        request.username,
        request.password,
      );

      const userResponse = this.toUserModel(user);
      return userResponse;
    } catch (error) {
      throw new BadRequestException(error.message.toString());
    }
  }

  async logoutAccount(userId: UUID, refreshToken: JWTToken) {
    try {
      const user = await this.userModel.findOne({ id: userId });
      if (!user)
        return this.toUserSessionModel(undefined, false, 'User not found');
      console.log(user.sessions);
      user.sessions = user.sessions.map((session) => {
        if (session.refreshToken === refreshToken) {
          return { ...session, refreshToken: undefined };
        }
        return session;
      });
      await user.save();
      return this.toUserSessionModel(user, true, 'User logged out');
    } catch (error) {
      throw new BadRequestException(error.message.toString());
    }
  }

  async findUserByUsername(username: string) {
    try {
      const user = await this.userModel.findOne({ username });
      return this.toUserModel(user);
    } catch (error) {
      throw new BadRequestException(error.toString());
    }
  }

  async findUserById(userId: UUID) {
    try {
      const user = await this.userModel.findOne({ id: userId });
      return this.toUserModel(user);
    } catch (error) {
      throw new BadRequestException(error.toString());
    }
  }

  async findUserByEmail(email: string) {
    try {
      const user = await this.userModel.findOne({ email: email });
      return this.toUserModel(user);
    } catch (error) {
      throw new BadRequestException(error.toString());
    }
  }

  async findUserRoles(userId: UUID): Promise<UserRolesResponse> {
    try {
      const user = await this.userModel.findOne({ id: userId });
      if (!user) return this.toUserRolesModel(undefined);

      return this.toUserRolesModel(user);
    } catch (error) {
      throw new BadRequestException(error.nessage.toString());
      return this.toUserRolesModel(undefined);
    }
  }

  private toUserModel(user: UserSchema) {
    return plainToClass(UserResponse, user, {
      excludeExtraneousValues: true,
    });
  }

  private toUserRolesModel(user: UserSchema) {
    return plainToClass(UserRolesResponse, user, {
      excludeExtraneousValues: true,
    });
  }

  private toUserSessionModel(
    user: UserSchema,
    status: boolean,
    message: string,
  ) {
    return plainToClass(
      UserSessionResponse,
      { user, status, message },
      {
        excludeExtraneousValues: true,
      },
    );
  }
}
