import { CustomExceptionGen } from "../../global/exception/exception.general";


export class UserNotFoundException extends CustomExceptionGen {
    constructor(message: string = 'user not found') {
        super(message);
        this.name = UserNotFoundException.name;
        Error.captureStackTrace(this, this.constructor)
    }
}