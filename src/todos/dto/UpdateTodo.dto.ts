import { IsNotEmpty } from "class-validator"

export class UpdateTodoDto{
    
    @IsNotEmpty()
    id:string

    title:string

    description:string
}