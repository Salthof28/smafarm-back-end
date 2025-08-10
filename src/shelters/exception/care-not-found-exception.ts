import { CustomExceptionGen } from "../../global/exception/exception.general";


export class CareNotFoundException extends CustomExceptionGen {
    constructor(message: string = 'care not found') {
        super(message);
        this.name = CareNotFoundException.name;
        Error.captureStackTrace(this, this.constructor)
    }
}