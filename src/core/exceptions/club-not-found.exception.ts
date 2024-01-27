import { UnauthorizedException } from "@nestjs/common"
import { Exception } from "../shared/exception"

export class ClubNotFoundException extends Exception {
    getException() {
        return new UnauthorizedException("the give club id was not found or is not valid", { cause: this.error });
    }
}