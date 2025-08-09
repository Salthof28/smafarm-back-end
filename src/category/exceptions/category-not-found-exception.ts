import { CustomExceptionGen } from "../../global/exception/exception.general";


export class CategoryNotFoundException extends CustomExceptionGen {
    constructor(message: string = 'category not found') {
        super(message);
        this.name = CategoryNotFoundException.name;
        Error.captureStackTrace(this, this.constructor)
    }
}