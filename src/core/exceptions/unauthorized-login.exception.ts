import { UnauthorizedException } from "@nestjs/common";
import { Exception } from "../shared/exception";

export class UnauthorizedLoginException extends Exception {
    override getException() {
        return new UnauthorizedException("the credentials are not correct", { cause: this.error })
    }
}