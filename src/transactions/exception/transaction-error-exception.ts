import { CustomExceptionGen } from "../../global/exception/exception.general";


export class TransactionErrorException extends CustomExceptionGen {
    constructor(message: string = 'transaction not process, total amout undefined') {
        super(message);
        this.name = TransactionErrorException.name;
        Error.captureStackTrace(this, this.constructor)
    }
}