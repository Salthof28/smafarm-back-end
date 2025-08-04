import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { CustomExceptionGen } from "../exception/exception.general";
import { HttpAdapterHost } from "@nestjs/core";
import { DatabaseException } from "../exception/database-exception";


@Catch(CustomExceptionGen)
export class ExceptionFilterGen implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) {}
    catch(exception: CustomExceptionGen, host: ArgumentsHost) {
        const { httpAdapter } = this.httpAdapterHost;
        
        const ctx = host.switchToHttp();
        const res = ctx.getResponse()

        let responseBody = {
            message: 'something wrong on our side',
            error: 'internal server error',
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        }

        if(exception instanceof DatabaseException) {
            responseBody = {
                message: exception.message,
                error: exception.name,
                statusCode: HttpStatus.BAD_REQUEST,
            }
        }
        httpAdapter.reply(res, responseBody, responseBody.statusCode)
    }
}