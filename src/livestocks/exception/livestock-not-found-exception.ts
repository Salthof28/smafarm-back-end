import { CustomExceptionGen } from "../../global/exception/exception.general";


export class LivestockNotFoundException extends CustomExceptionGen {
    constructor(message: string = 'livestock not found') {
        super(message);
        this.name = LivestockNotFoundException.name;
        Error.captureStackTrace(this, this.constructor)
    }
}