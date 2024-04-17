import { Body, Controller, Delete, Get, HttpException, Param, Post, Put } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUserRO } from './user.interface';
import { UserService } from './user.service';
import { SurveyService } from 'src/survey/survey.service';
import { TemplateService } from 'src/template/template.service';
import { QuestionService } from 'src/question/question.service';

@Controller('/api/v2/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly surveyService: SurveyService,
    private readonly templateService: TemplateService,
    private readonly questionService: QuestionService
  ) {}

    @ApiOperation({ summary: 'Search user' })
    @ApiResponse({ status: 200, description: 'Return user' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({ status: 404, description: 'No user found.' })
    @Get("/:id") 
    async getOneUser(@Param() data): Promise<IUserRO>   {
      return this.userService.getOneUserById(data.id)
    } 

    @ApiOperation({ summary: 'Update user' })
    @ApiResponse({ status: 201, description: 'The user has been successfully updated.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @Put() 
    async updateOneUser(@Body('id') id:number,@Body('user') newUserData: UpdateUserDto){
      return this.userService.updateOneUser(id,newUserData);
    }

    @ApiOperation({ summary: 'Search user s surveys' })
    @ApiResponse({ status: 200, description: 'Return survey' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @Get('surveys') 
    async getUserSurvey(@Body('id') userId: number)   {
      return this.surveyService.getUserSurveyById(userId)
    } 

    @ApiOperation({ summary: 'Search user s templates' })
    @ApiResponse({ status: 200, description: 'Return templates' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @Get('templates') 
    async getUserTemplate(@Body('id') userId: number)   {
      return this.templateService.getUserTemplateById(userId)
    } 

    @ApiOperation({ summary: 'Search user s questions' })
    @ApiResponse({ status: 200, description: 'Return questions' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @Get('questions') 
    async getUserQuestion(@Body('id') userId: number)   {
      return this.questionService.getUserQuestionById(userId)
    } 

    @ApiOperation({ summary: 'Create user' })
    @ApiResponse({ status: 201, description: 'The user has been successfully created.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({ status: 500, description: 'Email already exist' })
    @Post() 
    async createOneUser(@Body('user') createUserData: CreateUserDto){
      console.log("ici")
      return this.userService.createOneUser(createUserData);
    }

    @ApiOperation({ summary: 'Delete user' })
    @ApiResponse({ status: 201, description: 'The user has been successfully deleted.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @Delete("/:id") 
    async deleteOneUser(@Param() data){
      return this.userService.deleteById(data.id);
    }

    @ApiOperation({ summary: 'Login user' })
    @ApiResponse({ status: 200, description: 'The user has been successfully logged.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({ status: 404, description: 'Not found' })
    @Post("/login")
    async loginUser(@Body('user') loginUserDto: LoginUserDto) : Promise<IUserRO>{
      return this.userService.loginUser(loginUserDto);
    }
}
