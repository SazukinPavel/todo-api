import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "src/types/Request";

export const User=createParamDecorator((data:string,ctx:ExecutionContext)=>{
    const user=ctx.switchToHttp().getRequest<Request>().user
    if(user){
        return data?user[data]:user
    }
    return null
})