import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getOneUser({ type, searchValue }: {
        type: any;
        searchValue: any;
    }): Promise<void>;
    updateOneUser(newUserData: UpdateUserDto): Promise<void>;
    createOneUser(createUserData: CreateUserDto): Promise<any>;
    deleteOneUser(deleteUserData: string): Promise<void>;
    loginUser(loginUserDto: LoginUserDto): Promise<void>;
}
