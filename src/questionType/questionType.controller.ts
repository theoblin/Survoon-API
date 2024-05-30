import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { QuestionTypeService } from './questionType.service';



@Controller('/api/v2/questions/type')
export class QuestionTypeController {
  constructor(private readonly QuestionTypeService: QuestionTypeService) {}

    @ApiOperation({ summary: 'Search all QuestionTypes' })
    @ApiResponse({ status: 200, description: 'Return QuestionType' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @Get('/all') 
    async getAllQuestionTypes()   {
      return this.QuestionTypeService.getAllQuestionTypes()
    } 

    @ApiOperation({ summary: 'Search question' })
    @ApiResponse({ status: 200, description: 'Return question' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @Get('/:id') 
    async getOneQuestion(@Param('id') id:number)   {
      return this.QuestionTypeService.getOneQuestionTypeById(id)
    } 


}
