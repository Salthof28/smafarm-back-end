// because function callback, we use promisify to be able use in async await function. scrypt change password to string

import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { UsersRepositoryItf } from "./users.repository.interface";
import { Prisma, Users } from "@prisma/client";
import { Condition } from "src/global/entities/condition-entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { DatabaseException } from "src/global/exception/database-exception";
import { handlePrismaError } from "src/global/utils/prisma.error.util";

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
}