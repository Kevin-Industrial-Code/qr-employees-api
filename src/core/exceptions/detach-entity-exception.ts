import { InternalServerErrorException } from "@nestjs/common";
import { Exception } from "../shared/exception";

export class DetachEntityException extends Exception {

    override getException() {
        return new InternalServerErrorException("The entity could not be detached from the qr", { cause: this.error });
    }
}
