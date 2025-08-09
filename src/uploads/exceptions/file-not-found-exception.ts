import { CustomExceptionGen } from "../../global/exception/exception.general";


export class FileNotFoundException extends CustomExceptionGen {
    constructor(message: string = 'you not send file for stored') {
        super(message);
        this.name = FileNotFoundException.name;
        Error.captureStackTrace(this, this.constructor)
    }
}