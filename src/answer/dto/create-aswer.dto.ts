import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateAnswerDto {

  @ApiProperty()
  readonly ip: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'body cant be null',always: true})
  readonly body: object;

  @ApiProperty()
  readonly valid: boolean;

  @ApiProperty()
  code: string;

  @ApiProperty()
  readonly position: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'ended cant be null',always: true})
  readonly ended: boolean;

  @ApiProperty()
  readonly language: string;

  @ApiProperty()
  readonly createdDate: Date;

  @ApiProperty()
  readonly lastUpdateDate: Date;

}