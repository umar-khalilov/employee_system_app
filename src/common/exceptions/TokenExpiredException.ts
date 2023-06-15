import { HttpException } from './HttpException';
import { HttpStatusCodes } from '../enums/HttpStatusCodes';

export class TokenExpiredException extends HttpException {
    constructor(expiredAt: Date) {
        super(`jwt expired: ${expiredAt}`, HttpStatusCodes.BAD_REQUEST);
    }
}
