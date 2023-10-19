import { ErrorCode } from './errorCodes';

export default class Error404 extends Error {
    httpCode: number;
    code: ErrorCode;

    constructor(code: ErrorCode, message: string) {
        super(message);
        this.httpCode = 404;
        this.code = code;
    }
}
