import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
import { Request } from "src/types/Request";

export class AuthGuard implements CanActivate{
    
    
    canActivate(context: ExecutionContext): boolean {
        const user=context.switchToHttp().getRequest<Request>().user
        if(user){
            return true
        }
        return false
    }

}