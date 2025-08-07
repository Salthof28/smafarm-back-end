import { RoleUser } from "@prisma/client";

export interface AccessPayload {
    sub: number,
    id_token: string,
    name: string,
    role: RoleUser,
    expires_at: Date
}