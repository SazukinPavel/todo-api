import { AuthGuard } from './../guards/AuthGuard';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/Register.dto';
import { LoginDto } from './dto/Login.dto';
import { Body, Controller, Post, UsePipes, ValidationPipe, Get, UseGuards } from '@nestjs/common';
import { User } from 'src/decorators/User.decorator';

@Controller('auth')
export class AuthController {

    constructor(private authService:AuthService){}

    @Get()
    @UseGuards(AuthGuard)
    checkToken(@User() user){
        return user
    }

    @Post('login')
    @UsePipes(new ValidationPipe())
    loginUser(@Body() dto:LoginDto){
        return this.authService.login(dto)
    }

    @Post('register')
    @UsePipes(new ValidationPipe())
    registerUser(@Body() dto:RegisterDto){
        return this.authService.register(dto)
    }

    
}
