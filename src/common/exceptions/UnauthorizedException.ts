import { HttpException } from './HttpException';
import { HttpStatusCodes } from '../enums/HttpStatusCodes';

export class UnauthorizedException extends HttpException {
    constructor(message = 'Wrong email or password') {
        super(message, HttpStatusCodes.UNAUTHORIZED);
    }
}
