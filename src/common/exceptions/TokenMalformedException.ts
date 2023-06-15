import { HttpException } from './HttpException';
import { HttpStatusCodes } from '../enums/HttpStatusCodes';

export class TokenMalformedException extends HttpException {
    constructor() {
        super('jwt malformed', HttpStatusCodes.BAD_REQUEST);
    }
}
