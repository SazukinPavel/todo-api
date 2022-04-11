import { AuthService } from './auth.service';
import { RegisterDto } from './dto/Register.dto';
import { LoginDto } from './dto/Login.dto';
import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';

@Controller('auth')
export class AuthController {

    constructor(private authService:AuthService){}

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
