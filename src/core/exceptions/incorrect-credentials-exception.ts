import { UnauthorizedException } from "@nestjs/common";
import { Exception } from "../shared/exception";

export class IncorrectCredentialsException extends Exception{
    override getException() {
        return new UnauthorizedException("Either the user or the password are not correct (credentials)", { cause: this.error });
    }
}