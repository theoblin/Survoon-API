import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

export class UpdateSurveyDto {
    @ApiProperty()
    @IsNotEmpty({ message: 'Survey ID cant be null',always: true})
    readonly id: number;

    @ApiProperty()
    @IsOptional()
    readonly config: string;

    @ApiProperty()
    @IsOptional()
    readonly entry: string;

    @ApiProperty()
    @IsOptional()
    readonly tags: string;

    @ApiProperty()
    @IsOptional()
    readonly name: string;

    @ApiProperty()
    @IsOptional()
    lastUpdateDate:Date;

    @ApiProperty()
    @IsOptional()
    readonly visibility: string;

    @ApiProperty()
    @IsOptional()
    readonly active: boolean;

  }