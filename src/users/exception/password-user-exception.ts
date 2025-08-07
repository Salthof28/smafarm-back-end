import { CustomExceptionGen } from "../../global/exception/exception.general";


export class PasswordUserException extends CustomExceptionGen {
    constructor(message: string = 'old password invalid') {
        super(message);
        this.name = PasswordUserException.name;
        Error.captureStackTrace(this, this.constructor)
    }
}