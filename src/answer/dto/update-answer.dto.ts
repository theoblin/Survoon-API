import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateAnswerDto {

  @IsNotEmpty({ message: 'Answer ID cant be null',always: true})
  readonly id: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'QuestList cant be null',always: true})
  readonly questionsList: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Validity cant be null',always: true})
  readonly valid: boolean;

  @ApiProperty()
  @IsNotEmpty({ message: 'LastUpdateDate cant be null',always: true})
  lastUpdateDate: Date;

  @ApiProperty()
  @IsNotEmpty({ message: 'Survey ID cant be null',always: true})
  readonly survey: number;


}