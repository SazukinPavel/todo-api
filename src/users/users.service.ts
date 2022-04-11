import { AddUserDto } from './dto/AddUser.dto';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/entitys/User.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(UserEntity)private userRepo:Repository<UserEntity>){}

    async add(dto:AddUserDto){
        return await this.userRepo.save({...dto,role:'USER'})
    }

    findByName(name:string){
        return this.userRepo.findOne({where:{username:name}})
    }

    findByEmail(email:string){
        return this.userRepo.findOne({where:{email}})
    }

    findByNameOrEmail(name:string,email:string){
        return [this.findByName(name),this.findByEmail(email)]
    }

}
