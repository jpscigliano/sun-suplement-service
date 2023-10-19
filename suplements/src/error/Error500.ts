import { ErrorCode } from './errorCodes';

export default class Error500 extends Error {
    httpCode: number;
    constructor(message: string) {
        super(message);
        this.httpCode = 500;
    }
}
