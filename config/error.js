// error.js
export class BaseError extends Error {
    constructor(errorObj) {
        super(errorObj.message);
        this.data = errorObj;  // `status`와 `message` 포함
    }
}
