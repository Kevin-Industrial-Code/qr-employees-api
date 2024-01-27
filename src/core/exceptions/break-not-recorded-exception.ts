import { InternalServerErrorException } from "@nestjs/common";
import { Exception } from "../shared/exception";

export class BreakNotRecordedException extends Exception {

    getException() {
        return new InternalServerErrorException("there was a problem recording the qr, no break has been stored", { cause: this.error });
    }
}