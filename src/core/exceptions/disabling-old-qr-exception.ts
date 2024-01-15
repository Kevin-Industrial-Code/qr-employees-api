import { InternalServerErrorException } from "@nestjs/common";
import { Exception } from "../shared/exception";

export class DisablingOldQrException extends Exception {

    getException() {
        throw new InternalServerErrorException(this.error);
    }
}