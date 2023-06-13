import { HttpException } from './HttpException';
import { HttpStatusCodes } from '../utils/HttpStatusCodes';

export class BadRequestException extends HttpException {
    constructor(errors?: string[]) {
        super('Bad request', HttpStatusCodes.BAD_REQUEST, errors);
    }
}
