import { CustomExceptionGen } from "src/global/exception/exception.general";


export class PhoneRegisteredException extends CustomExceptionGen {
    constructor(message: string = 'phone registered') {
        super(message);
        this.name = PhoneRegisteredException.name;
        Error.captureStackTrace(this, this.constructor)
    }
}