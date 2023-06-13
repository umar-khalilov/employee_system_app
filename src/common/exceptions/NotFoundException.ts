import { HttpException } from './HttpException';
import { HttpStatusCodes } from '../utils/HttpStatusCodes';

export class NotFoundException extends HttpException {
    constructor(message = 'Not found') {
        super(message, HttpStatusCodes.NOT_FOUND);
    }
}
