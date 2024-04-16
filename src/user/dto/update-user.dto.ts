import { ApiProperty } from "@nestjs/swagger";
import { LanguageEntity } from "src/language/language.entity";

export class UpdateUserDto {

    @ApiProperty()
    password: string;

    
    @ApiProperty()
    passwordOld: string;

    @ApiProperty()
    passwordConfirm: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    type: string;

    @ApiProperty()
    language: LanguageEntity;

  }