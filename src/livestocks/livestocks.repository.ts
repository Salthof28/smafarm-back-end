import { Injectable } from "@nestjs/common";
import { LivestocksRepositoryItf } from "./livestocks.repository.interface";
import { PrismaService } from "prisma/prisma.service";

@Injectable()
export class LivestocksRepository implements LivestocksRepositoryItf {
    constructor(private readonly prisma: PrismaService){}
    
}