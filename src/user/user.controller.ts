import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUserRO } from './user.interface';
import { UserService } from './user.service';

@Controller('/api/v2/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

    @ApiOperation({ summary: 'Search user' })
    @ApiResponse({ status: 200, description: 'Return user' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @Get() 
    async getOneUser(@Body() {type,searchValue})/* : Promise<IUserRO> */ {
    } 

    @ApiOperation({ summary: 'Update user' })
    @ApiResponse({ status: 201, description: 'The user has been successfully updated.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @Put() 
    async updateOneUser(@Body('user') newUserData: UpdateUserDto){
    }

    @ApiOperation({ summary: 'Create user' })
    @ApiResponse({ status: 201, description: 'The user has been successfully created.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @Post() 
    async createOneUser(@Body('user') createUserData: CreateUserDto){
      return this.userService.createOneUser(createUserData)
    }

    @ApiOperation({ summary: 'Delete user' })
    @ApiResponse({ status: 201, description: 'The user has been successfully deleted.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @Delete() 
    async deleteOneUser(@Body('user') deleteUserData: string){
    }

    @ApiOperation({ summary: 'Login user' })
    @ApiResponse({ status: 200, description: 'The user has been successfully logged.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @Post("/login")
    async loginUser(@Body('user') loginUserDto: LoginUserDto)/* : Promise<IUserRO> */{
    }
}
