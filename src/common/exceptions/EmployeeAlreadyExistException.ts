import { HttpException } from './HttpException';
import { HttpStatusCodes } from '../enums/HttpStatusCodes';

export class EmployeeAlreadyExistException extends HttpException {
    constructor(email) {
        super(
            `Employee with that email: ${email} already exist`,
            HttpStatusCodes.CONFLICT,
        );
    }
}
