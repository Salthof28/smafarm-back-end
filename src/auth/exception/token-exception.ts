import { CustomExceptionGen } from "src/global/exception/exception.general";


export class TokenException extends CustomExceptionGen {
    constructor(message: string = 'invalid refresh token') {
        super(message);
        this.name = TokenException.name;
        Error.captureStackTrace(this, this.constructor)
    }
}