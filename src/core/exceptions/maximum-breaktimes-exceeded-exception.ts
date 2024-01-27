import { UnauthorizedException } from "@nestjs/common";
import { Exception } from "../shared/exception";

export class MaximumBreaktimesExceededException extends Exception {

    getException() {
        return new UnauthorizedException("The Qr has reached the maximum amount of breaktimes", { cause: this.error });
    }
}