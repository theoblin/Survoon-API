import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateSurveyDto {


  @ApiProperty()
  @IsNotEmpty({ message: 'Name cant be null',always: true})
  readonly name: string;

  @ApiProperty()
  readonly language: string;
  
  @ApiProperty()
  @IsOptional()
  readonly template: number;

}