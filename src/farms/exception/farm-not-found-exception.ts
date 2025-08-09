import { CustomExceptionGen } from "../../global/exception/exception.general";


export class FarmNotFoundException extends CustomExceptionGen {
    constructor(message: string = 'farm not found') {
        super(message);
        this.name = FarmNotFoundException.name;
        Error.captureStackTrace(this, this.constructor)
    }
}