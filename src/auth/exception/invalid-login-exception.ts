import { CustomExceptionGen } from "src/global/exception/exception.general";


export class InvalidLoginException extends CustomExceptionGen {
    constructor(message: string = 'email or password invalid') {
        super(message);
        this.name = InvalidLoginException.name;
        Error.captureStackTrace(this, this.constructor)
    }
}