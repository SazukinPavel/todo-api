import { UsersService } from './../users/users.service';
import { UserEntity } from 'src/entitys/User.entity';
import { JWT_SECRET_KEY } from './../../config';
import { Injectable, NestMiddleware } from "@nestjs/common";
import { verify } from "jsonwebtoken";
import { Request } from "src/types/Request";

@Injectable()
export class AuthMiddleware implements NestMiddleware{
    
    constructor(private usersService:UsersService){}

    async use(req: Request, res: any, next: (error?: any) => void) {
        req.user=null
        const token=req.headers['authorization']
        if(token){
           try{
            const jwtUser=verify(token,JWT_SECRET_KEY) as UserEntity
            if(jwtUser){
                const user=await this.usersService.findById(jwtUser.id)
                req.user=user
            }
           }catch{
                req.user=null
           }
        }
        next()
    }

}