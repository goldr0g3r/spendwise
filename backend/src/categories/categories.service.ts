import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import { ICreateCategoryRequest } from 'src/common/interface/category/request/ICategoryRequest';
import { JWTToken } from 'src/common/types/auth';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CategoriesService {
  constructor(
    private readonly categoriesRepository: CategoriesRepository,
    private readonly jwtService: JwtService,
  ) {}

  async createCategory(
    category: ICreateCategoryRequest,
    accessToken: JWTToken,
  ) {
    const decodedToken = await this.decodeToken(accessToken);
    if (
      !decodedToken ||
      decodedToken === undefined ||
      decodedToken === null ||
      typeof decodedToken !== 'object'
    ) {
      throw new UnauthorizedException('Invalid token, please login again');
    }
    category.userId = decodedToken.payload.id;
    return this.categoriesRepository.createCategory(category);
    }
    
    async listCategoriesByUser(accessToken: JWTToken) { 
        const decodedToken = await this.decodeToken(accessToken); 
        if ( !decodedToken || decodedToken === undefined || decodedToken === null || typeof decodedToken !== 'object' ) { 
            throw new UnauthorizedException('Invalid token, please login again'); 
        } 
        return await this.categoriesRepository.listCategoriesByUser(decodedToken.payload.id); 
    }

  private decodeToken(token: JWTToken) {
    return this.jwtService.decode(token, {
      complete: true,
      json: true,
    });
  }
}
