import { CustomExceptionGen } from "../../global/exception/exception.general";


export class UploadException extends CustomExceptionGen {
    constructor(message: string = 'unexpected storage error') {
        super(message);
        this.name = UploadException.name;
        Error.captureStackTrace(this, this.constructor)
    }
}