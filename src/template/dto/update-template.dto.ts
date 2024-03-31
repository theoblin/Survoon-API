import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateTemplateDto {

  @ApiProperty()
  @IsNotEmpty({ message: 'Template ID cant be null',always: true})
  readonly id: number;

  @ApiProperty()
  readonly config: string;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly active: Boolean;

  @ApiProperty()
  @IsNotEmpty({ message: 'User ID cant be null',always: true})
  readonly user: number;

  @ApiProperty()
  readonly visibility: string;

}