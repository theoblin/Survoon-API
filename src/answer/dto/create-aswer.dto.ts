import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateAnswerDto {

  @ApiProperty()
  @IsNotEmpty()
  readonly ip: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly questionsList: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly valid: boolean;

  @ApiProperty()
  @IsNotEmpty()
  readonly createdDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  readonly lastUpdateDate: Date;

}