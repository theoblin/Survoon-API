import { IsNotEmpty } from 'class-validator';

export class LoginUserDto {

  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;

  @IsNotEmpty()
  readonly type: string;

  @IsNotEmpty()
  readonly createdDate: string;
}