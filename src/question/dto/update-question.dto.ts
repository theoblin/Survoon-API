import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateQuestionDto {

  @ApiProperty()
  @IsNotEmpty({ message: 'Question ID cant be null',always: true})
  readonly id: number;

  @ApiProperty()
  readonly title: string;

  @ApiProperty()
  readonly type: string;

  @ApiProperty()
  readonly config: string;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly visibility: string;

  @ApiProperty()
  lastUpdateDate:Date;

}