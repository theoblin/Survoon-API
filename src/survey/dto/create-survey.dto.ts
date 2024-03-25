import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateSurveyDto {

  @IsNotEmpty({ message: 'Config cant be null',always: true})
  readonly config: string;

  @IsNotEmpty({ message: 'Tags cant be null',always: true})
  readonly tags: string;

  @IsNotEmpty({ message: 'Name cant be null',always: true})
  readonly name: string;

  @IsNotEmpty({ message: 'Visibility cant be null',always: true})
  readonly visibility: string;

  @IsNotEmpty({ message: 'Active cant be null',always: true})
  readonly active: boolean;

  readonly createdDate: Date;

  readonly lastUpdateDate: Date;

  @IsNotEmpty({ message: 'Link cant be null',always: true})
  readonly link: string;
  
}