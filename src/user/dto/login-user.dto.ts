import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, isString } from 'class-validator';

export class LoginUserDto {

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty({ message: 'Email cant be null',always: true})
  @IsString()
  readonly email: string;

  @IsNotEmpty({ message: 'Password cant be null',always: true})
  @IsString()
  readonly password: string;

}