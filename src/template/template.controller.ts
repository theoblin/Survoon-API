import { Body, Controller, Delete, Get, Ip, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import {TemplateService } from './template.service';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { CreateTemplateDto } from './dto/create-template.dto';


@Controller('/api/v2/template')
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

    @ApiOperation({ summary: 'Search template' })
    @ApiResponse({ status: 200, description: 'Return template' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @Get(':slug') 
    async getOneTemplate(@Param('slug') id:number)   {
      return this.templateService.getOneTemplateById(id)
    } 

    @ApiOperation({ summary: 'Update template' })
    @ApiResponse({ status: 201, description: 'The template has been successfully updated.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @Put() 
    async updateOneTemplate(@Body('template') newTemplateData: UpdateTemplateDto){
      return this.templateService.updateOneTemplate(newTemplateData)
    }

    @ApiOperation({ summary: 'Create template' })
    @ApiResponse({ status: 201, description: 'The template has been successfully created.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @Post()
    async createOneTemplate(@Body('user') id: number,@Body('template') createTemplateData: CreateTemplateDto){
      return this.templateService.createOneTemplate(id,createTemplateData)
    }

    @ApiOperation({ summary: 'Delete template' })
    @ApiResponse({ status: 201, description: 'The template has been successfully deleted.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @Delete() 
    async deleteOneTemplate(@Body('id') id: number){
      return this.templateService.deleteTemplateById(id)
    }

}
