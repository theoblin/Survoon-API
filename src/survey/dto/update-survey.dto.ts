import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class UpdateSurveyDto {
    @ApiProperty()
    readonly id: number;

    @ApiProperty()
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
    lastUpdateDate:Date;

    @ApiProperty()
    @IsNotEmpty()
    readonly visibility: string;

    @ApiProperty()
    @IsNotEmpty()
    readonly active: boolean;

    @ApiProperty()
    @IsNotEmpty()
    readonly user: number;
  
  }