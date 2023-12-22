import { Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, LoginUserDto } from './dto/create-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Get()
    getAllUsers() {
        return this.userService.getUsers()
    }

    @Post('registration')
    registration(@Body() dto: CreateUserDto) {
        return this.userService.registration(dto)
    }

    @Post('login')
    login(@Body() dto: LoginUserDto) {
        return this.userService.loginUser(dto)
    }
    

    @Post(':userId/avatar')
    @UseInterceptors(FileInterceptor('avatarImg'))
    setAvatar(@Param('userId') userId: number, @UploadedFile() avatarImg: Express.Multer.File) {
        return this.userService.setAvatar(userId, avatarImg);
    }

    @Get(':userId')
    getUserById(@Param('userId') userId: number) {
           return this.userService.getById(userId)
    }

    @Get('info/:userId')
    getUserByEmail(@Param('userId') userId: number) {
           return this.userService.getUserInfo(userId)
    }

}
