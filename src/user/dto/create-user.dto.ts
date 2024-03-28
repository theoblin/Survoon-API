import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {

  @IsNotEmpty({ message: 'Email cant be null',always: true})
  readonly email: string;

  @IsNotEmpty({ message: 'Password cant be null',always: true})
  password: string;

  @IsNotEmpty({ message: 'Type cant be null',always: true})
  readonly type: string;

  readonly token: string;

  createdDate: Date;
  
}