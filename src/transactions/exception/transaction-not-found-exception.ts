import { CustomExceptionGen } from "../../global/exception/exception.general";


export class TransactionNotFoundException extends CustomExceptionGen {
    constructor(message: string = 'transaction not found') {
        super(message);
        this.name = TransactionNotFoundException.name;
        Error.captureStackTrace(this, this.constructor)
    }
}