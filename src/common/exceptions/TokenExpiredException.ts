import { HttpStatusCodes } from '../enums/HttpStatusCodes';
import { HttpException } from './HttpException';

export class TokenExpiredException extends HttpException {
    constructor(expiredAt: Date) {
        super(`jwt expired: ${expiredAt}`, HttpStatusCodes.BAD_REQUEST);
    }
}
