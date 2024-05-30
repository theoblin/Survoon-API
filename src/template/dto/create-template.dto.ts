import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTemplateDto {

  @ApiProperty()
  @IsNotEmpty({ message: 'Config cant be null',always: true})
  readonly config: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Name cant be null',always: true})
  readonly name: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Visibility cant be null',always: true})
  readonly visibility: string;

}