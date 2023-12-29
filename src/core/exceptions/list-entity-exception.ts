import { InternalServerErrorException } from '@nestjs/common';
import { Exception } from '../shared/exception';

export class ListEntityException extends Exception{

    override getException() {
        return new InternalServerErrorException(this.error);
    }
}
