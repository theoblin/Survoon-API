import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateQuestionDto {

  @ApiProperty()
  @IsNotEmpty({ message: 'Title cant be null',always: true})
  readonly title: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Type cant be null',always: true})
  readonly type: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Config cant be null',always: true})
  readonly config: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Name cant be null',always: true})
  readonly name: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Visibility cant be null',always: true})
  readonly visibility: string;

  

}