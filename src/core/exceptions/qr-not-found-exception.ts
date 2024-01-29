import { NotFoundException } from "@nestjs/common";
import { Exception } from "../shared/exception";

export class QRNotFoundException extends Exception {
    
    getException() {
        return new NotFoundException("the qr provided was not found", { cause: this.error});
    }
}