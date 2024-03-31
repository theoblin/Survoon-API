import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class UpdateUserDto {

    @ApiProperty()
    readonly password: string;

    @IsEmail()
    @ApiProperty()
    readonly email: string;

    @ApiProperty()
    readonly type: string;

  }