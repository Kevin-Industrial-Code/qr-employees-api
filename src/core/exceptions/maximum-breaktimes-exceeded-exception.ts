import { UnauthorizedException } from "@nestjs/common";
import { Exception } from "../shared/exception";

export class MaximumBreaktimesExceededException extends Exception {
    
    getException() {
        return new UnauthorizedException(this.error);
    }
}