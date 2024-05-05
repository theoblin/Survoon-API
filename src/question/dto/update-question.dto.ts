import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { QuestionTypeEntity } from 'src/questionType/questionType.entity';

export class UpdateQuestionDto {

  @ApiProperty()
  @IsNotEmpty({ message: 'Question ID cant be null',always: true})
  readonly id: number;

  @ApiProperty()
  @IsOptional()
  readonly title: string;

  @ApiProperty()
  @IsOptional()
  questionType: QuestionTypeEntity;

  @ApiProperty()
  @IsOptional()
  readonly config: object;

  @ApiProperty()
  @IsOptional()
  readonly name: string;

  @ApiProperty()
  @IsOptional()
  readonly visibility: string;

  @ApiProperty()
  @IsOptional()
  readonly position: number;


  @ApiProperty()
  @IsOptional()
  lastUpdateDate:Date;

}