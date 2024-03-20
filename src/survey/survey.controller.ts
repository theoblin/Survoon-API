import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { ISurveyRO } from './survey.interface';
import { SurveyService } from './survey.service';
import { User } from '../user/user.decorator';

@Controller('/api/v2/survey')
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

    @ApiOperation({ summary: 'Search survey' })
    @ApiResponse({ status: 200, description: 'Return survey' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @Get(':slug') 
    async getOneSurvey(@Param('slug') id:string) /* : Promise<ISurveyRO> */  {
      return this.surveyService.getOneSurveyById(id)
    } 

    @ApiOperation({ summary: 'Update survey' })
    @ApiResponse({ status: 201, description: 'The survey has been successfully updated.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @Put() 
    async updateOneSurvey(@User('id') user: number, @Body('survey') newSurveyData: UpdateSurveyDto){
      return this.surveyService.updateOneSurvey(user,newSurveyData)
    }

    @ApiOperation({ summary: 'Create survey' })
    @ApiResponse({ status: 201, description: 'The survey has been successfully created.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @Post()
    async createOneSurvey(@User('id') userId: number,@Body('survey') createSurveyData: CreateSurveyDto){
      return this.surveyService.createOneSurvey(userId,createSurveyData)
    }

    @ApiOperation({ summary: 'Delete survey' })
    @ApiResponse({ status: 201, description: 'The survey has been successfully deleted.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @Delete() 
    async deleteOneSurvey(@Body('survey') id: string ,@Body('user') userId: string){
      return this.surveyService.deleteSurveyById(id,userId)
    }

}
