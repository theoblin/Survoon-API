import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateQuestionDto {

  @ApiProperty()
  readonly title: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Type cant be null',always: true})
  readonly type: string;

  @ApiProperty()
  readonly config: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Name cant be null',always: true})
  readonly name: string;

  @ApiProperty()
  readonly visibility: string;

  

}