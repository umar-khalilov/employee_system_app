import { HttpException } from './HttpException';
import { HttpStatusCodes } from '../enums/HttpStatusCodes';

export class TokenException extends HttpException {
    constructor(message = 'Token error') {
        super(message, HttpStatusCodes.AUTHENTICATION_TIMEOUT);
    }
}
