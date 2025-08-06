// because function callback, we use promisify to be able use in async await function. scrypt change password to string
import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { UsersRepositoryItf } from "./users.repository.interface";
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

    async findById(id: number): Promise<(Users & { sessions: SessionLogin[] }) | undefined> {
        try {
            const user = await this.prisma.users.findUnique({
                where: {
                    id
                },
               include: { sessions: true }
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

    async loginSession(session: SessionDetailDto): Promise<SessionLogin> {
        try {
            const newLogin = await this.prisma.sessionLogin.create({
                data: {
                    user_id: session.user_id,
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

    async findSessionbyUserId(user_id: number): Promise<SessionLogin[] | undefined> {
        try {
            const findAllSession: SessionLogin[] = await this.prisma.sessionLogin.findMany({
                where: {
                    user_id
                }
            });
            if(findAllSession.length < 1) return undefined;
            return findAllSession
        } catch (error) {
            handlePrismaError(error);
        }
    }

    async updateRefreshToken(newRefreshToken: UpdateRefreshTokenSessionDto): Promise<SessionLogin> {
        try {
            const updateSession: SessionLogin = await this.prisma.sessionLogin.update({
                where: { id: newRefreshToken.id},
                data: {
                    refreshToken: newRefreshToken.refreshToken,
                    expires_at: newRefreshToken.expires_at
                }
            });
            return updateSession
        } catch (error) {
            handlePrismaError(error);
        }
    }

    async deleteSession(id: string): Promise<SessionLogin> {
        try {
            const deleteSession: SessionLogin = await this.prisma.sessionLogin.delete({
                where: { id }
            });
            return deleteSession;
        } catch (error) {
            handlePrismaError(error);
        }
    }
}