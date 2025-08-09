import { CustomExceptionGen } from "../../global/exception/exception.general";


export class BucketNameException extends CustomExceptionGen {
    constructor(message: string = 'not found bucket name') {
        super(message);
        this.name = BucketNameException.name;
        Error.captureStackTrace(this, this.constructor)
    }
}