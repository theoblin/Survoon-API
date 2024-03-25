import { HttpException, Injectable } from '@nestjs/common';
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

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private readonly userEntityRepository: Repository<UserEntity>,
    ) { }

    async getOneUserById(id: number): Promise<IUserRO> {
        if (!id) {throw new HttpException({ Error: 'No id' }, 403);}

        const user = await this.userEntityRepository.findOne({ where: { id: id } });

        if (!user) {
            throw new HttpException({ User: ' not found' }, 404);
        }
        return this.buildUserRO(user)
    }

    async getOneUserByEmail(email: string): Promise<IUserRO> {
        const user = await this.userEntityRepository.findOne({ where: { email: email } });

        if (!user) {
            const errors = { User: ' not found' };
            throw new HttpException({ errors }, 401);
        }

        return this.buildUserRO(user)
    }

    async updateOneUser(id: number, dto: UpdateUserDto) : Promise<IUserRO> {

        if (!id) throw new HttpException('NotFoundException', 404);
        let toUpdate = await this.userEntityRepository.findOne({ where: { id: id } });
        if (!toUpdate) throw new HttpException('NotFoundException', 404);
        let updated = Object.assign(toUpdate, dto);
        const user = await this.userEntityRepository.save(updated);

        return  this.buildUserRO(user) ;
    }

    async createOneUser(dto: CreateUserDto): Promise<IUserRO> {

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
        return await this.userEntityRepository.delete({ id: id });
    }

    async loginUser(dto: LoginUserDto): Promise<IUserRO> {
        
        const user = await this.userEntityRepository.findOne({ where: { email: dto.email } });
        if (!user) throw new HttpException({ User: 'Not found' }, 401);
        const match = await bcrypt.compare(dto.password, user.password)
        if (!match) throw new HttpException({ User: 'Password mismatch' }, 401);

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

    private buildUserRO(user: UserEntity) {
        const userRO = {
            id: user.id,
            email: user.email,
            type: user.type,
            token: this.generateJWT(user),
            createdDate: user.createdDate
        };

        return { user: userRO };
    }
}




