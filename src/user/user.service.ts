import { ConflictException, HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUserRO } from './user.interface';
import * as jwt from 'jsonwebtoken';
import { UserEntity } from './user.entity';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from "@nestjs/typeorm";
import { SECRET } from '../config';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { LanguageEntity } from 'src/language/language.entity';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private readonly userEntityRepository: Repository<UserEntity>,
        @InjectRepository(LanguageEntity)
        private readonly languageEntityRepository: Repository<LanguageEntity>,
    ) { }

    async getOneUserById(id: number): Promise<IUserRO> {
        if (!id) {throw new HttpException({ message: 'No id provided' }, 403);}

        const user = await this.userEntityRepository.findOne({ where: { id: id } });

        if (!user) {
            throw new HttpException({ message: 'User not found' }, 404);
        }
        return this.buildUserRO(user)
    }

    async getOneUserByEmail(email: string): Promise<IUserRO> {
        const user = await this.userEntityRepository.findOne({ where: { email: email } });
        if (user)  return this.buildUserRO(user)
    }

    async updateOneUser(id: number, dto: UpdateUserDto) : Promise<IUserRO> {

        if (!id) throw new HttpException({ message: 'User not found' }, 401);

        if (dto.language){
            try{
                const queryBuilder = this.languageEntityRepository.createQueryBuilder('language');
                const language = await queryBuilder
                  .where('language.code = :code', {  code:dto.language })
                  .getOne();
                
                  dto.language = language
        
            }catch(error){
                throw new HttpException({message:error}, 500);
            }
        }


        const queryBuilder = this.userEntityRepository.createQueryBuilder('user');
        const user = await queryBuilder
        .leftJoinAndSelect("user.language", "language")
        .where('user.id = :id', {  id:id })
        .getOne();

        
        if (!user) throw new HttpException({ message: 'User not found' }, 404);
        let updated = Object.assign(user, dto);

        if (dto.password ){
            await this.hashPassword(dto.password).then(e => {
                dto.password = e;
            })
        }
         await this.userEntityRepository.update(id, {
            ...(dto.email && { email: dto.email }),
            ...(dto.password && { password: dto.password }),
            ...(dto.type && { type: dto.type }),
            ...(dto.language && { language: dto.language }),
          });

        return  this.buildUserRO(updated) ;
    }

    async createOneUser(dto: CreateUserDto): Promise<IUserRO> {

        try{
            const queryBuilder = this.languageEntityRepository.createQueryBuilder('language');
            const language = await queryBuilder
              .where('language.code = :code', {  code:dto.language })
              .getOne();

            dto.language = language.id;
        }catch(error){
            throw new HttpException([{message:"Language error"}], 400);
        }

        dto.createdDate = new Date();
        

        await this.hashPassword(dto.password).then(e => {
            dto.password = e;
        })

        let created = Object.assign(dto);

        try {
            const user = await this.userEntityRepository.save(created)
            user.token = this.generateJWT(dto);

            return this.buildUserRO(user);

        } catch (error) {
            throw new HttpException(error.detail, 500);
        }
    }

    async deleteById(id: number): Promise<DeleteResult> {
            if(!id) throw new HttpException({ message: 'No id provided' }, 400);
            return await this.userEntityRepository.delete({ id: id });
    }

    async loginUser(dto: LoginUserDto): Promise<IUserRO> {

        const queryBuilder = this.userEntityRepository.createQueryBuilder('user');
        const user = await queryBuilder
          .leftJoinAndSelect('user.language', 'language')
          .where('user.email = :email', {  email:dto.email })
          .getOne();
        
        if (!user) throw new HttpException({ message: 'User not found' }, 401);
        const match = await bcrypt.compare(dto.password, user.password)
        if (!match) throw new HttpException({ message: 'Wrong credentials' }, 401);
        return this.buildUserRO(user)
    }

    generateJWT(user) {
        const iat = Math.floor(Date.now() / 1000)
        const exp = iat + 3600 // seconds

        return jwt.sign({
            email: user.email,
            id: user.id,
            exp:exp
        }, SECRET);
    }

    hashPassword(password: string) {
        return bcrypt.hash(password, 12)
    }

    comparePasswords(passwordOld: string,password: string) {
        return bcrypt.compare(password, passwordOld)
    }

    private buildUserRO(user: UserEntity) {
        const userRO = {
            id: user.id,
            email: user.email,
            type: user.type,
            token: this.generateJWT(user),
            createdDate: user.createdDate,
            language:user.language
        };

        return { user: userRO };
    }
}




