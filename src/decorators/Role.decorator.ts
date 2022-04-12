import { SetMetadata } from '@nestjs/common';
import { RoleType, RoleKey } from './../types/Role';

export const Role=(role:RoleType)=>SetMetadata(RoleKey,role)
