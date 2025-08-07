import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { CustomExceptionGen } from "../exception/exception.general";
import { HttpAdapterHost } from "@nestjs/core";
import { DatabaseException } from "../exception/database-exception";
import { EmailRegisteredException } from "src/auth/exception/email-registered-exception";
import { PhoneRegisteredException } from "src/auth/exception/phone-registered-exception";
import { InvalidLoginException } from "src/auth/exception/invalid-login-exception";
import { TokenException } from "src/auth/exception/token-exception";
import { UserNotFoundException } from "src/users/exception/user-not-found-exception";
import { PasswordUserException } from "src/users/exception/password-user-exception";


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
        else if(exception instanceof EmailRegisteredException) {
            responseBody = {
                message: exception.message,
                error: exception.name,
                statusCode: HttpStatus.CONFLICT,
            }
        }
        else if(exception instanceof PhoneRegisteredException) {
            responseBody = {
                message: exception.message,
                error: exception.name,
                statusCode: HttpStatus.CONFLICT,
            }
        }
        else if(exception instanceof InvalidLoginException) {
            responseBody = {
                message: exception.message,
                error: exception.name,
                statusCode: HttpStatus.BAD_REQUEST,
            }
        }
        else if(exception instanceof TokenException) {
            responseBody = {
                message: exception.message,
                error: exception.name,
                statusCode: HttpStatus.NOT_FOUND,
            }
        }
        else if(exception instanceof UserNotFoundException) {
            responseBody = {
                message: exception.message,
                error: exception.name,
                statusCode: HttpStatus.NOT_FOUND,
            }
        }
        else if(exception instanceof PasswordUserException) {
            responseBody = {
                message: exception.message,
                error: exception.name,
                statusCode: HttpStatus.BAD_REQUEST,
            }
        }

        httpAdapter.reply(res, responseBody, responseBody.statusCode)
    }
}