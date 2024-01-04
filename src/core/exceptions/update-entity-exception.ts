import { InternalServerErrorException } from "@nestjs/common";
import { Exception } from "../shared/exception";

export class UpdateEntityException extends Exception {
    getException() {
        throw new InternalServerErrorException(this.error);
    }
}