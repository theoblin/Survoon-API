import { Body, Controller, Delete, Get, HttpException, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUserRO } from './user.interface';
import { UserService } from './user.service';
import { SurveyService } from 'src/survey/survey.service';
import { User } from './user.decorator';

@Controller('/api/v2/user')
export class UserController {
  constructor(private readonly userService: UserService, private readonly surveyService: SurveyService) {}

    @ApiOperation({ summary: 'Search user' })
    @ApiResponse({ status: 200, description: 'Return user' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({ status: 404, description: 'No user found.' })
    @Get() 
    async getOneUser(@Body() data): Promise<IUserRO>   {
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

    @ApiOperation({ summary: 'Create user' })
    @ApiResponse({ status: 201, description: 'The user has been successfully created.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({ status: 500, description: 'Email already exist' })
    @Post() 
    async createOneUser(@Body('user') createUserData: CreateUserDto){
      return this.userService.createOneUser(createUserData);
    }

    @ApiOperation({ summary: 'Delete user' })
    @ApiResponse({ status: 201, description: 'The user has been successfully deleted.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @Delete() 
    async deleteOneUser(@Body('id') id: number){
      return this.userService.deleteById(id);
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
