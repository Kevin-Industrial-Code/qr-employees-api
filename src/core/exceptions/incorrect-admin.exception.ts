import { UnauthorizedException } from "@nestjs/common";
import { Exception } from "../shared/exception";

export class IncorrectAdminException extends Exception {

    override getException() {
        return new UnauthorizedException("either the password or the user are not correc", { cause: this.error })
    }
}