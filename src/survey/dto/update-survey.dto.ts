import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class UpdateSurveyDto {
    @ApiProperty()
    @IsNotEmpty({ message: 'Survey ID cant be null',always: true})
    readonly id: number;

    @ApiProperty()
    readonly config: string;

    @ApiProperty()
    readonly tags: string;

    @ApiProperty()
    readonly name: string;

    @ApiProperty()
    lastUpdateDate:Date;

    @ApiProperty()
    readonly visibility: string;

    @ApiProperty()
    readonly active: boolean;

    @ApiProperty()
    @IsNotEmpty({ message: 'User ID cant be null',always: true})
    readonly user: number;
  
  }