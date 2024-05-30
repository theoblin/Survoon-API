import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateAnswerDto {

  @IsNotEmpty({ message: 'code cant be null',always: true})
  readonly code: string;

  @ApiProperty()
  @IsOptional()
  readonly body: object;

  @ApiProperty()
  @IsOptional()
  token: string;

  @ApiProperty()
  @IsOptional()
  readonly valid: boolean;

  @ApiProperty()
  readonly position: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'ended cant be null',always: true})
  readonly ended: boolean;
  
  @ApiProperty()
  @IsOptional()
  readonly language: string;

  @ApiProperty()
  @IsOptional()
  lastUpdateDate: Date;

  @ApiProperty()
  @IsOptional()
  readonly survey: number;


}