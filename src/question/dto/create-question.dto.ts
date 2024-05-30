import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateQuestionDto {

  @ApiProperty()
  readonly title: string;

  @ApiProperty()
  readonly config: object;

  @ApiProperty()
  readonly style: object;

  @ApiProperty()
  @IsNotEmpty({ message: 'Name cant be null',always: true})
  readonly name: string;

  @ApiProperty()
  readonly position: number;

  @ApiProperty()
  readonly visibility: string;

  

}