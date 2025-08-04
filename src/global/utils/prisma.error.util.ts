import { Prisma } from "@prisma/client";
import { DatabaseException } from "../exception/database-exception";


export function handlePrismaError(error): never {
    // Error unique constraint, foreign key (example P1001: prisma not connect to database)
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new DatabaseException(`Database error: ${error.code} - ${error.message}`);
    }
    // problem connection DB (PgBouncer juga bisa muncul di sini)
    if (error instanceof Prisma.PrismaClientInitializationError) {
        throw new DatabaseException(`Database connection failed: ${error.message}`);
    }
    // Query Prisma not valid
    if (error instanceof Prisma.PrismaClientValidationError) {

        throw new DatabaseException(`Invalid database query: ${error.message}`);
    }
    // PgBouncer / Postgres native error
    if (error && typeof error === 'object' && 'code' in error) {
        throw new DatabaseException(`Postgres error: ${error.code} - ${error.message}`);
    }
    // Fallback unknown error
    throw new DatabaseException();
}