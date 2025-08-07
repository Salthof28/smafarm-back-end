// because function callback, we use promisify to be able use in async await function. scrypt change password to string
import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { UpdatedUser, UsersRepositoryItf } from "./users.repository.interface";
import { Prisma, SessionLogin, Users } from "@prisma/client";
import { Condition } from "src/global/entities/condition-entity";
import { CreateUserDto } from "./dto/req/create-user.dto";
import { DatabaseException } from "src/global/exception/database-exception";
import { handlePrismaError } from "src/global/utils/prisma.error.util";
import { SessionDetailDto } from "./dto/req/create-session-login.dto";
import { UpdateRefreshTokenSessionDto } from "./dto/req/update-refresh-token-session.dto";

// implements UserRepositoryItf
@Injectable()
export class UsersRepository implements UsersRepositoryItf {

    constructor(private prisma: PrismaService){}

    async findEmail(email: string): Promise<Users | undefined> {
        try {
            const user: Users | null = await this.prisma.users.findUnique({
                where: {
                    email
                }
            });
            if(user === null) return undefined;
            return user
        } catch (error) {
            handlePrismaError(error);
        }

    }

    async findById(id: number): Promise<Users | undefined> {
        try {
            const user = await this.prisma.users.findUnique({
                where: {
                    id
                }
            });
            if(user === null) return undefined;
            return user
        } catch (error) {
            handlePrismaError(error);
        }
    }

    async findExistingUser(condition: Condition[]): Promise<Users | undefined> {
        try {
            const user: Users | null = await this.prisma.users.findFirst({
                where: { OR: condition }
            });
            if(user === null) return undefined;
            return user
        } catch (error) {
            handlePrismaError(error);
        }

    }

    async created(body: CreateUserDto): Promise<Users> {
        try {
            const user: Users = await this.prisma.users.create({
                data: {
                    name: body.name,
                    email: body.email,
                    phone: body.phone,
                    status: 'ACTIVE',
                    password: body.password,
                    role: body.role
                }
            });
            return user
        } catch (error) {
            handlePrismaError(error);
        }
    }

    async updatedProfile(user: UpdatedUser): Promise<Users> {
        try {
            const updateUser: Users = await this.prisma.users.update({
                where: { id: user.id },
                data: {
                    name: user.body.name,
                    email: user.body.email,
                    img_profile: user.body.img_profile,
                    phone: user.body.phone,
                    password: user.body.password,
                }
            });
            return updateUser;
        } catch (error) {
            handlePrismaError(error);
        }
    }

    async deleteUser(id: number): Promise<Users> {
        try {
            const deleteUser: Users = await this.prisma.users.delete({
                where: { id }
            });
            return deleteUser;
        } catch (error) {
            handlePrismaError(error);
        }
    }

    async updatedUserByAdmin(user: UpdatedUser): Promise<Users> {
        try {
            const updateUser: Users = await this.prisma.users.update({
                where: { id: user.id },
                data: {
                    status: user.body.status,
                    role: user.body.role
                }
            });
            return updateUser;
        } catch (error) {
            handlePrismaError(error);
        }
    }

    async loginSession(session: SessionDetailDto): Promise<SessionLogin> {
        try {
            const newLogin = await this.prisma.sessionLogin.create({
                data: {
                    user_id: session.user_id,
                    id_token: session.id_token,
                    refreshToken: session.refreshToken,
                    userAgent: session.userAgent,
                    ipAddress: session.ipAddress,
                    expires_at: session.expires_at
                }
            });
            return newLogin;
        } catch (error) {
            handlePrismaError(error);
        }
    }

    async findSessionbyIdToken(id_token: string): Promise<SessionLogin | undefined> {
        try {
            const findSession: SessionLogin | null = await this.prisma.sessionLogin.findUnique({
                where: {
                    id_token
                }
            });
            if(findSession === null) return undefined;
            return findSession
        } catch (error) {
            handlePrismaError(error);
        }
    }

    async updateRefreshToken(newRefreshToken: UpdateRefreshTokenSessionDto): Promise<SessionLogin> {
        try {
            const updateSession: SessionLogin = await this.prisma.sessionLogin.update({
                where: { id: newRefreshToken.id},
                data: {
                    id_token: newRefreshToken.id_token,
                    refreshToken: newRefreshToken.refreshToken,
                    expires_at: newRefreshToken.expires_at
                }
            });
            return updateSession
        } catch (error) {
            handlePrismaError(error);
        }
    }

    async deleteSession(id_token: string): Promise<SessionLogin> {
        try {
            const deleteSession: SessionLogin = await this.prisma.sessionLogin.delete({
                where: { id_token }
            });
            return deleteSession;
        } catch (error) {
            handlePrismaError(error);
        }
    }
}