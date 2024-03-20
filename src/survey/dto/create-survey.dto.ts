import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateSurveyDto {

  @ApiProperty({description:"Questions list,sizes,colors,texts"})
  @IsNotEmpty()
  readonly config: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly tags: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly createdDate: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly link: string;
  
}