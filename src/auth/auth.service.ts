import { hash } from 'bcryptjs';
import { RegisterDto } from './dto/Register.dto';
import { JWT_SECRET_KEY } from './../../config';
import { UserEntity } from './../entitys/User.entity';
import { LoginDto } from './dto/Login.dto';
import { UsersService } from './../users/users.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

@Injectable()
export class AuthService {

    constructor(private usersService:UsersService){}

    async register(dto:RegisterDto){
        const [userByName,userByEmail]=await Promise.all(this.usersService.findByNameOrEmail(dto.username,dto.email))
        if(userByEmail || userByName){
            throw new HttpException('Имя или email уже занято',HttpStatus.BAD_REQUEST)
        }
        const user=await this.usersService.add({...dto,password:await hash(dto.password,10)})
        return this.generateResponse(user)
    }

    async login(dto:LoginDto){
        const [userByName,userByEmail]=await Promise.all(this.usersService.findByNameOrEmail(dto.usernameOrEmail,dto.usernameOrEmail))
        if(!userByEmail && !userByName){
            throw new HttpException('Нету пользователя с таким именем или email',HttpStatus.NOT_ACCEPTABLE)
        }
        const user=userByEmail ?? userByName
        const isPasswordEqual=await compare(dto.password,user.password)
        if(!isPasswordEqual){
            throw new HttpException('Неправильный пароль',HttpStatus.NOT_ACCEPTABLE)
        }
        return this.generateResponse(user)
    }

    private generateResponse(user:UserEntity){
        delete user.password
        return {token:this.generateToken(user),user}
    }

    private generateToken({email,username,role}:UserEntity){
        return sign({email,username,role},JWT_SECRET_KEY)
    }

}
