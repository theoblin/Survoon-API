import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {

  @ApiProperty()
  @IsNotEmpty({ message: 'Email cant be null',always: true})
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Password cant be null',always: true})
  @MinLength(10)
  password: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Type cant be null',always: true})
  readonly type: string;

  readonly token: string;

  createdDate: Date;

  language: number;
  
}
