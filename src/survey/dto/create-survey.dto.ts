import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateSurveyDto {

  @ApiProperty()
  @IsNotEmpty({ message: 'Config cant be null',always: true})
  readonly config: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Tags cant be null',always: true})
  readonly tags: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Name cant be null',always: true})
  readonly name: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Visibility cant be null',always: true})
  readonly visibility: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Active cant be null',always: true})
  readonly active: boolean;

  @ApiProperty()
  readonly createdDate: Date;

  @ApiProperty()
  readonly lastUpdateDate: Date;

  @ApiProperty()
  @IsNotEmpty({ message: 'Link cant be null',always: true})
  readonly link: string;
  
}