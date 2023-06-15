import { HttpStatusCodes } from '../enums/HttpStatusCodes';
import { HttpException } from './HttpException';

export class UnauthorizedException extends HttpException {
    constructor(message = 'Wrong email or password') {
        super(message, HttpStatusCodes.UNAUTHORIZED);
    }
}
