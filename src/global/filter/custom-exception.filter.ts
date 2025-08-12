import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { CustomExceptionGen } from "../exception/exception.general";
import { HttpAdapterHost } from "@nestjs/core";
import { DatabaseException } from "../exception/database-exception";
import { EmailRegisteredException } from "../../auth/exception/email-registered-exception";
import { PhoneRegisteredException } from "../../auth/exception/phone-registered-exception";
import { InvalidLoginException } from "../../auth/exception/invalid-login-exception";
import { TokenException } from "../../auth/exception/token-exception";
import { UserNotFoundException } from "../../users/exception/user-not-found-exception";
import { PasswordUserException } from "../../users/exception/password-user-exception";
import { FileNotFoundException } from "../../uploads/exceptions/file-not-found-exception";
import { BucketNameException } from "../../uploads/exceptions/bucket-name-exception";
import { UploadException } from "../../uploads/exceptions/upload-exception";
import { CategoryNotFoundException } from "../../category/exceptions/category-not-found-exception";
import { FarmNotFoundException } from "../../farms/exception/farm-not-found-exception";
import { ShelterNotFoundException } from "../../shelters/exception/shelter-not-found-exception";
import { CareNotFoundException } from "../../shelters/exception/care-not-found-exception";
import { ShelterAccessException } from "../../shelters/exception/shelter-access-exception";
import { LivestockNotFoundException } from "../../livestocks/exception/livestock-not-found-exception";
import { LivestockAccessException } from "../../livestocks/exception/livestock-access-exception";


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
        else if(exception instanceof FileNotFoundException) {
            responseBody = {
                message: exception.message,
                error: exception.name,
                statusCode: HttpStatus.NOT_FOUND,
            }
        }
        else if(exception instanceof BucketNameException) {
            responseBody = {
                message: exception.message,
                error: exception.name,
                statusCode: HttpStatus.NOT_FOUND,
            }
        }
        else if(exception instanceof UploadException) {
            responseBody = {
                message: exception.message,
                error: exception.name,
                statusCode: HttpStatus.BAD_REQUEST,
            }
        }
        else if(exception instanceof CategoryNotFoundException) {
            responseBody = {
                message: exception.message,
                error: exception.name,
                statusCode: HttpStatus.NOT_FOUND,
            }
        }
        else if(exception instanceof FarmNotFoundException) {
            responseBody = {
                message: exception.message,
                error: exception.name,
                statusCode: HttpStatus.NOT_FOUND,
            }
        }
        else if(exception instanceof ShelterNotFoundException) {
            responseBody = {
                message: exception.message,
                error: exception.name,
                statusCode: HttpStatus.NOT_FOUND,
            }
        }
        else if(exception instanceof CareNotFoundException) {
            responseBody = {
                message: exception.message,
                error: exception.name,
                statusCode: HttpStatus.NOT_FOUND,
            }
        }
        else if(exception instanceof ShelterAccessException) {
            responseBody = {
                message: exception.message,
                error: exception.name,
                statusCode: HttpStatus.BAD_REQUEST,
            }
        }
        else if(exception instanceof LivestockNotFoundException) {
            responseBody = {
                message: exception.message,
                error: exception.name,
                statusCode: HttpStatus.NOT_FOUND,
            }
        }
        else if(exception instanceof LivestockAccessException) {
            responseBody = {
                message: exception.message,
                error: exception.name,
                statusCode: HttpStatus.BAD_REQUEST,
            }
        }
        httpAdapter.reply(res, responseBody, responseBody.statusCode)
    }
}