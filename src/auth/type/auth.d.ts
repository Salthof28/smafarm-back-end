import { RoleUser } from "@prisma/client";

export interface AccessPayload {
    sub: number,
    name: string,
    role: RoleUser,
    expires_at: Date
}