import { CustomExceptionGen } from "../../global/exception/exception.general";


export class ShelterNotFoundException extends CustomExceptionGen {
    constructor(message: string = 'shelter not found') {
        super(message);
        this.name = ShelterNotFoundException.name;
        Error.captureStackTrace(this, this.constructor)
    }
}
