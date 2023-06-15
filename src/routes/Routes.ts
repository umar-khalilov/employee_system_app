import { IncomingMessage, ServerResponse } from 'node:http';
import { LoggerService } from '../common/services/LoggerService';
import { NotFoundException } from '../common/exceptions/NotFoundException';
import { HttpStatusCodes } from '../common/enums/HttpStatusCodes';
import { conditions, getQueryParams } from '../common/utils/helpers';
import { authController } from '../auth/AuthController';
import { employeeController } from '../models/employees/EmployeeController';

export class Routes {
    private static readonly logger = new LoggerService(Routes.name).log(
        'Initialized',
    );

    public static async mainRouter(
        req: IncomingMessage,
        res: ServerResponse,
    ): Promise<void> {
        const { pathname, searchParams } = getQueryParams(req);
        if (conditions.isHome(req, pathname)) {
            res.writeHead(HttpStatusCodes.OK, {
                'Content-Type': 'text/plain',
            });
            res.end('Welcome to my vanilla Node.js server!');
        } else if (conditions.isSignUp(req, pathname)) {
            authController.signUp(req, res);
        } else if (conditions.isSignIn(req, pathname)) {
            authController.signIn(req, res);
        } else if (conditions.isGetAll(req, pathname, searchParams)) {
            employeeController.findAllEmployees(req, res, searchParams);
        } else if (conditions.isGet(req, pathname)) {
            employeeController.findOneEmployee(req, res);
        } else if (conditions.isUpdate(req, pathname)) {
            employeeController.updateOneEmployee(req, res);
        } else if (conditions.isDelete(req, pathname)) {
            employeeController.removeOneEmployee(req, res);
        } else {
            res.writeHead(HttpStatusCodes.NOT_FOUND, {
                'Content-Type': 'application/json',
            });
            res.end(
                JSON.stringify(
                    new NotFoundException('The requested path not found'),
                ),
            );
        }
    }
}
