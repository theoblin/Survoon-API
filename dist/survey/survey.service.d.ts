import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { ConfigService } from '@nestjs/config';
export declare class SurveyService {
    private configService;
    constructor(configService: ConfigService);
    getOneSurveyById(id: string): Promise<string>;
    updateOneSurvey(id: number, dto: UpdateSurveyDto): Promise<{
        id: number;
        dto: UpdateSurveyDto;
    }>;
    createOneSurvey(dto: CreateSurveyDto): Promise<string>;
    deleteSurveyById(id: string, userId: string): Promise<string>;
}
