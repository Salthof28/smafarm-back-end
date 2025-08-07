import { Users } from "@prisma/client";
import { UpdateUserDto } from "./dto/req/update-user.dto";
import { Condition } from "src/global/entities/condition-entity";



export interface UsersServiceItf {
    getProfile(id: number): Promise<Users>;
    updateProfile(user: UpdatedUser): Promise<Users>;
    exceptionUpdate(condition: Condition[], user: UpdateUserDto);
    findUserByAdmin(id: number): Promise<Users>;
    updateUserByAdmin(user: UpdatedUserByAdmin): Promise<Users>;
    deletUserByAdmin(id: number): Promise<Users>;
}

export interface UpdatedUser {
    id: number,
    body: UpdateUserDto
    oldPassword?: string
}
export interface UpdatedUserByAdmin {
    id: number,
    body: UpdateUserDto,
}