import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ConfigService } from '@nestjs/config';
export declare class UserService {
    private configService;
    constructor(configService: ConfigService);
    getOneUserById(id: string): Promise<string>;
    getOneUserByEmail(email: string): Promise<string>;
    updateOneUser(id: number, dto: UpdateUserDto): Promise<string>;
    createOneUser(dto: CreateUserDto): Promise<any>;
    deleteById(id: string): Promise<string>;
    deleteByEmail(email: string): Promise<string>;
    loginUser(): Promise<string>;
    generateJWT(user: any): any;
    private buildUserRO;
}
