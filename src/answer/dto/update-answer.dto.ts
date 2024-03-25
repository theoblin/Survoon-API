import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateAnswerDto {

  @IsNotEmpty()
  readonly id: number;

  @ApiProperty()
  @IsNotEmpty()
  readonly questionsList: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly valid: boolean;

  @ApiProperty()
  @IsNotEmpty()
  lastUpdateDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  readonly survey: number;


}