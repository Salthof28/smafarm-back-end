import { CustomExceptionGen } from "../../global/exception/exception.general";


export class LivestockAccessException extends CustomExceptionGen {
    constructor(message: string = 'you not have acces this livestock') {
        super(message);
        this.name = LivestockAccessException.name;
        Error.captureStackTrace(this, this.constructor)
    }
}