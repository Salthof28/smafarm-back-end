import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    constructor() {
        super()
    }

    async onModuleInit() {
        await this.$connect();
        console.log('PrismaService initialized');
    }
    // close the connection database
    async onModuleDestroy() {
        await this.$disconnect();
    }
}