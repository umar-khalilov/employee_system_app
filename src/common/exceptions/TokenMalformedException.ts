import { HttpStatusCodes } from '../enums/HttpStatusCodes';
import { HttpException } from './HttpException';

export class TokenMalformedException extends HttpException {
    constructor() {
        super('jwt malformed', HttpStatusCodes.BAD_REQUEST);
    }
}
