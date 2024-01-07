import { UnauthorizedException } from "@nestjs/common";
import { Exception } from "../shared/exception";

export class IncorrectCredentialsExceptoin extends Exception{
    override getException() {
        return new UnauthorizedException(this.error);
    }
}