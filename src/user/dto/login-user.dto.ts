import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginUserDto {

  @IsEmail()
  @IsNotEmpty({ message: 'Email cant be null',always: true})
  @ApiProperty()
  readonly email: string;

  @IsNotEmpty({ message: 'Password cant be null',always: true})
  readonly password: string;

}