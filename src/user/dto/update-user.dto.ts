import { ApiProperty } from "@nestjs/swagger";
import { LanguageEntity } from "src/language/language.entity";
import { IsMatching, IsPasswordValid,IsMatchingOldPassword} from "../validators/password.validator";
import { IsOptional } from "class-validator";
import { isEmailUnique } from "../validators/email.validator";

export class UpdateUserDto {

    @ApiProperty()
    @IsPasswordValid(4,'password')
    @IsOptional()
    password: string;

    @ApiProperty()
    @IsPasswordValid(null,'passwordConfirm')
    @IsMatching('password')
    @IsOptional()
    passwordConfirm: string;

    @ApiProperty()
    @isEmailUnique({ message: 'Email already exist'})
    @IsOptional()
    email: string;

    @ApiProperty()
    @IsOptional()
    type: string;

    @ApiProperty()
    @IsOptional()
    language: LanguageEntity;

  }


