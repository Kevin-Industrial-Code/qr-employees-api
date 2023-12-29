export abstract class Exception {

    constructor(
        protected error
    ){}

    getException() {
        return this.error;
    }
}
