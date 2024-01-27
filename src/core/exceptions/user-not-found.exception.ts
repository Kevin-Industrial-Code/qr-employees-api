import { UnauthorizedException } from "@nestjs/common";
import { Exception } from "../shared/exception";

export class UserNotFoundException extends Exception {
    getException() {
        return new UnauthorizedException("either the user or password are not correct", { cause: this.error })
    }
}