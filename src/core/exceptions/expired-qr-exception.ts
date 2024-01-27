import { UnauthorizedException } from "@nestjs/common";
import { Exception } from "../shared/exception";

export class ExpiredQrException extends Exception {
    getException() {
        return new UnauthorizedException("the qr provided is already expired", { cause: this.error });
    }
}