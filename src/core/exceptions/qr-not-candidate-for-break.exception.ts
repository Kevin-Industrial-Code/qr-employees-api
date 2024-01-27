import { UnauthorizedException } from "@nestjs/common";
import { Exception } from "../shared/exception";

export class QrNotCandidateForBreakException extends Exception {
    override getException() {
        return new UnauthorizedException("the qr is not a candidate for a breaktime", { cause: this.error });
    }
}