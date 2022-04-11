import { IsEmail, IsNotEmpty, Length} from "class-validator";

export class RegisterDto{

    @IsNotEmpty()
    username:string

    @IsEmail()
    email:string

    @IsNotEmpty()
    @Length(8)
    password:string

    bio:string
}