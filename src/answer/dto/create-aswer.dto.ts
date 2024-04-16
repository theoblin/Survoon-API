import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateAnswerDto {

  @ApiProperty()
  readonly ip: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'questionsList cant be null',always: true})
  readonly questionsList: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'valid cant be null',always: true})
  readonly valid: boolean;

  @ApiProperty()
  readonly language: string;

  @ApiProperty()
  readonly createdDate: Date;

  @ApiProperty()
  readonly lastUpdateDate: Date;

}