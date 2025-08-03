import { Users } from "@prisma/client";
import { CreateUserDto } from "./dto/create-user.dto";
import { Condition } from "src/global/entities/condition-entity";

export interface UsersRepositoryItf {
    findEmail(email: string): Promise<Users | undefined>
    findExistingUser(condition: Condition[]): Promise<Users | undefined>
    created(body: CreateUserDto): Promise<Users>
}


