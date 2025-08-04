import { CustomExceptionGen } from "./exception.general";


export class DatabaseException extends CustomExceptionGen {
    constructor(message: string = 'unexpected database error') {
        super(message);
        this.name = DatabaseException.name;
        Error.captureStackTrace(this, this.constructor);
    }
}