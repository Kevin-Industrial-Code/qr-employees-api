import { UnauthorizedException } from "@nestjs/common"
import { Exception } from "../shared/exception"

export class ActiveBreakException extends Exception {
    getException() {
        return new UnauthorizedException("there is an already active break associated with this qr", { cause: this.error });
    }
}