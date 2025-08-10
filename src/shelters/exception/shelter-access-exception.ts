import { CustomExceptionGen } from "../../global/exception/exception.general";


export class ShelterAccessException extends CustomExceptionGen {
    constructor(message: string = 'you not have acces this shelter') {
        super(message);
        this.name = ShelterAccessException.name;
        Error.captureStackTrace(this, this.constructor)
    }
}