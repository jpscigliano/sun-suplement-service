import { ErrorCode } from './errorCodes';

export default class Error400 extends Error {
    httpCode: number;
    code: ErrorCode;

    constructor(code: ErrorCode, message: string) {
        super(message);
        this.httpCode = 400;
        this.code = code;
    }
}
