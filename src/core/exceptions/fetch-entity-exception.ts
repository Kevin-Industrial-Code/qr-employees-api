import { InternalServerErrorException } from "@nestjs/common";
import { Exception } from "../shared/exception";

export class FetchEntityException extends Exception {
    override getException() {
        return new InternalServerErrorException("Could not fetch the entity", { cause: this.error });
    }
}
