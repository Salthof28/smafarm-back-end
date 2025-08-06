import { Users } from "@prisma/client";


export interface UsersServiceItf {
    getProfile(id: number): Promise<Users>;
}