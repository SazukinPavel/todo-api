import { UserEntity } from './../../entitys/User.entity';



export interface UserAndTokenResponseDto{

    user:UserEntity
    token:string

}