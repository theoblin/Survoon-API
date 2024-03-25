import { Body, Controller, Delete, Get, Ip, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from '../user/user.decorator';
import { AnswerService } from './answer.service';
import { CreateAnswerDto } from './dto/create-aswer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@Controller('/api/v2/answer')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

    @ApiOperation({ summary: 'Search answer' })
    @ApiResponse({ status: 200, description: 'Return answer' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @Get(':slug') 
    async getOneAnswer(@Param('slug') id:number)   {
      return this.answerService.getOneAnswerById(id)
    } 

    @ApiOperation({ summary: 'Update answer' })
    @ApiResponse({ status: 201, description: 'The answer has been successfully updated.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @Put() 
    async updateOneAnswer(@Body('answer') newAnswerData: UpdateAnswerDto){
      return this.answerService.updateOneAnswer(newAnswerData)
    }

    @ApiOperation({ summary: 'Create answer' })
    @ApiResponse({ status: 201, description: 'The answer has been successfully created.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @Post()
    async createOneAnswer(@Body('survey') id: number,@Body('answer') createAnswerData: CreateAnswerDto,@Ip() ip){
      return this.answerService.createOneAnswer(id,createAnswerData,ip)
    }

    @ApiOperation({ summary: 'Delete answer' })
    @ApiResponse({ status: 201, description: 'The answer has been successfully deleted.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @Delete() 
    async deleteOneAnswer(@Body('id') id: number){
      return this.answerService.deleteAnswerById(id)
    }

}
