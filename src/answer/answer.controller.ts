import { Body, Controller, Delete, Get, Ip, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AnswerService } from './answer.service';
import { CreateAnswerDto } from './dto/create-aswer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@Controller('/api/v2/')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

    @ApiOperation({ summary: 'Search answer' })
    @ApiResponse({ status: 200, description: 'Return answer' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @Get('survey/:surveyId/answer/:slug') 
    async getOneAnswer(@Param('slug') code:string,@Param('surveyId') surveyId:number)   {
      return this.answerService.getOneAnswerByCode(code,surveyId)
    } 

    @ApiOperation({ summary: 'Update answer' })
    @ApiResponse({ status: 201, description: 'The answer has been successfully updated.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @Put('survey/:surveyId/answer') 
    async updateOneAnswer(@Body('answer') newAnswerData: UpdateAnswerDto,@Param('surveyId') surveyId:number){
      return this.answerService.updateOneAnswer(newAnswerData,surveyId)
    }

    @ApiOperation({ summary: 'Create answer' })
    @ApiResponse({ status: 201, description: 'The answer has been successfully created.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @Post('survey/:surveyId/answer')
    async createOneAnswer(@Body('answer') createAnswerData: CreateAnswerDto,@Param('surveyId') surveyId:number,@Ip() ip){
      return this.answerService.createOneAnswer(surveyId,createAnswerData,ip)
    }

    @ApiOperation({ summary: 'Delete answer' })
    @ApiResponse({ status: 201, description: 'The answer has been successfully deleted.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @Delete() 
    async deleteOneAnswer(@Body('id') id: number){
      return this.answerService.deleteAnswerById(id)
    }

}
