import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { SurveyService } from './survey.service';
export declare class SurveyController {
    private readonly surveyService;
    constructor(surveyService: SurveyService);
    getOneSurvey(id: string): Promise<string>;
    updateOneSurvey(user: number, newSurveyData: UpdateSurveyDto): Promise<{
        id: number;
        dto: UpdateSurveyDto;
    }>;
    createOneSurvey(createSurveyData: CreateSurveyDto): Promise<string>;
    deleteOneSurvey(id: string, userId: string): Promise<string>;
}
