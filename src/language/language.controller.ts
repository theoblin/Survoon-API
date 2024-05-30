import { Body, Controller, Delete, Get, Ip, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LanguageService } from './language.service';



@Controller('/api/v2/language')
export class LanguageController {
  constructor(private readonly languageService: LanguageService) {}

    @ApiOperation({ summary: 'Search all languages' })
    @ApiResponse({ status: 200, description: 'Return language' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @Get('/all') 
    async getAllLanguages()   {
      return this.languageService.getAllLanguages()
    } 


}
