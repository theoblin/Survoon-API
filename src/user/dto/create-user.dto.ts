import { ApiProperty } from '@nestjs/swagger';
import {  IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IsMatching, IsPasswordValid } from '../validators/password.validator';
import { isEmailUnique } from '../validators/email.validator';

export class CreateUserDto {

  @ApiProperty()
  @IsNotEmpty({ message: 'Email cant be null',always: true})
  @isEmailUnique({ message: 'Email already exist'})
  @IsEmail()
  @IsString()
  readonly email: string;

  @ApiProperty()
  @IsMatching('email')
  @IsString()
  readonly emailConfirm: string;

  @ApiProperty()
  @IsPasswordValid(4,"password")
  @IsString()
  password: string;

  @ApiProperty()
  @IsMatching('password')
  @IsString()
  passwordConfirm: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Type cant be null',always: true})
  @IsString()
  readonly type: string;
  
  readonly token: string;

  createdDate: Date;

  @ApiProperty()
  @IsNotEmpty({ message: 'Language cant be null',always: true})
  language: number;
  
}


