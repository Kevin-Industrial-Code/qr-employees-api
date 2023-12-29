import { InternalServerErrorException } from "@nestjs/common";
import { Exception } from "../shared/exception";

export class FetchEntityException extends Exception {
    override getException() {
        return new InternalServerErrorException(this.error);
    }
}
