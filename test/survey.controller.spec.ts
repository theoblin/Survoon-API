import { Test } from '@nestjs/testing';
import { SurveyController } from 'src/survey/survey.controller';
import { SurveyService } from 'src/survey/survey.service';


describe('CatsController', () => {
  let surveyController: SurveyController;
  let surveyService: SurveyService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
        controllers: [SurveyController],
        providers: [SurveyService],
      }).compile();

      surveyService = moduleRef.get<SurveyService>(SurveyService);
      surveyController = moduleRef.get<SurveyController>(SurveyController);
  });

/*   describe('findAll', () => {
    it('should return an array of cats', async () => {
      const result = ['test'];
      const id = 1;
      jest.spyOn(surveyService, 'getOneSurveyById').mockImplementation(() => result);

      expect(await surveyController.getOneSurvey(id)).toBe(result);
    });
  }); */
});