import { Users } from "@prisma/client";
import { CreateUserDto } from "src/users/dto/create-user.dto";


export interface AuthServiceItf {
    register(body: CreateUserDto): Promise<Users>;
}