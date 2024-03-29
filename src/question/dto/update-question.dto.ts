import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateQuestionDto {

  @ApiProperty()
  @IsNotEmpty()
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
  @IsNotEmpty()
  lastUpdateDate:Date;

  @IsNotEmpty()
  readonly user: number;

}