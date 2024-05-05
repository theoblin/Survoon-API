import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { SurveyService } from './survey.service';
import { User } from '../user/user.decorator';
import * as answerService from 'src/answer/answer.service';

@Controller('/api/v2/survey')
export class SurveyController {
  constructor(private readonly surveyService: SurveyService,private readonly answerService: answerService.AnswerService) {}

    @ApiOperation({ summary: 'Search survey Secure' })
    @ApiResponse({ status: 200, description: 'Return survey' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @Get("/secure/:id") 
    async getOneSurveySecure(@Param() data ,@User('id') userId: number)   {
      return this.surveyService.getOneSurveyByIdSecure(data.id,userId)
    } 

    @ApiOperation({ summary: 'Search survey' })
    @ApiResponse({ status: 200, description: 'Return survey' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @Get("/:id") 
    async getOneSurvey(@Param() data )   {
      return this.surveyService.getOneSurveyById(data.id)
    } 

    @ApiOperation({ summary: 'Search survey s answers' })
    @ApiResponse({ status: 200, description: 'Return answers' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @Post("answers") 
    async getSurveyAnswers(@Body('id') surveyId: number)   {
      return this.answerService.getSurveyAnswersById(surveyId)
    } 


    @ApiOperation({ summary: 'Update survey' })
    @ApiResponse({ status: 201, description: 'The survey has been successfully updated.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @Put() 
    async updateOneSurvey(@Body('survey') newSurveyData: UpdateSurveyDto){
      return this.surveyService.updateOneSurvey(newSurveyData)
    }

    @ApiOperation({ summary: 'Create survey' })
    @ApiResponse({ status: 201, description: 'The survey has been successfully created.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @Post("/create")
    async createOneSurvey(@User('id') userId: number,@Body('survey') createSurveyData: CreateSurveyDto,@Body('template') templateId:number,@Body('language') languageCode:string){
      return this.surveyService.createOneSurvey(userId,createSurveyData)
    }

    @ApiOperation({ summary: 'Delete survey' })
    @ApiResponse({ status: 201, description: 'The survey has been successfully deleted.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @Delete() 
    async deleteOneSurvey(@Body('survey') id: number ,@Body('user') userId: string){
      return this.surveyService.deleteSurveyById(id)
    }

}
