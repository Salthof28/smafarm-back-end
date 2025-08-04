import { CustomExceptionGen } from "src/global/exception/exception.general";

export class EmailRegisteredException extends CustomExceptionGen {
    constructor(message: string = 'email registered') {
        super(message);
        this.name = EmailRegisteredException.name;
        Error.captureStackTrace(this, this.constructor);
    }
}