export class BaseError extends Error {
    constructor(errorObj) {
        super(errorObj.message);
        this.data = errorObj;  // `status`와 `message` 포함
        this.status = errorObj.status; // HTTP 상태 코드를 추가할 수 있습니다.
        this.code = errorObj.code;
    }
}