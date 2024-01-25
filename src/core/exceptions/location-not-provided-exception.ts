import { UnauthorizedException } from "@nestjs/common";
import { Exception } from "../shared/exception";

export class LocationNotProvidedException extends Exception {
    override getException() {
        return new UnauthorizedException(this.error);
    }
}