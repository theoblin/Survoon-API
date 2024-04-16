import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateAnswerDto {

  @IsNotEmpty({ message: 'Answer ID cant be null',always: true})
  readonly id: number;

  @ApiProperty()
  readonly questionsList: string;

  @ApiProperty()
  readonly valid: boolean;

  @ApiProperty()
  readonly language: string;

  @ApiProperty()
  lastUpdateDate: Date;

  @ApiProperty()
  readonly survey: number;


}