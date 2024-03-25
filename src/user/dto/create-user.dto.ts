import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {

  @IsNotEmpty()
  readonly id: string;

  @IsNotEmpty()
  readonly username: string;

  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  readonly type: string;

  @IsNotEmpty()
  readonly token: string;

  @IsNotEmpty()
  createdDate: Date;
  
}