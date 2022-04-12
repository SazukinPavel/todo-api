import { UserEntity } from 'src/entitys/User.entity';


interface MyRequest extends Request{
    user:UserEntity
}

export {MyRequest as Request}