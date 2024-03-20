import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUserRO } from './user.interface';
import jwt from 'jsonwebtoken';
/* import { UserEntity } from './user.entity'; */
import { Repository } from 'typeorm';
import { InjectRepository } from "@nestjs/typeorm";
import { ConfigService } from '@nestjs/config';
import { SECRET } from '../config';

@Injectable()
export class UserService {

    constructor(
       /*  @InjectRepository(UserEntity) */
        /* private readonly userEntityRepository: Repository<UserEntity>, */
        private configService: ConfigService


    ) {}

    async getOneUserById(id:string) {
        return 'getOneUserById';
    }

    async getOneUserByEmail(email:string) {
        return 'getOneUserByEmail';
    }

    async updateOneUser(id: number, dto: UpdateUserDto) {
        return 'updateOneUser';
    }

    async createOneUser(dto: CreateUserDto)/* : Promise<IUserRO> */ {
        return this.generateJWT({"email":"test@gmail.com","id":1})
    }

    async deleteById(id:string) {
        return 'deleteById';
    }

    async deleteByEmail(email:string) {
        return 'deleteByEmail';
    }

    async loginUser() {
        return 'loginUser';
    }

    generateJWT(user) {
        const today = new Date();
        const exp = new Date(today);
        exp.setDate(today.getDate() + 60);
    
        return jwt.sign({
          email: user.email,
          exp: exp.getTime() / 1000,
          id: user.id,
        }, SECRET);
      }

    private buildUserRO(user) {
        const userRO = {
            email: user.email,
            token: this.generateJWT(user),
        };

        return { user: userRO };
    }
}




