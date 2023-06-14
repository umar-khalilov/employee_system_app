import { IncomingMessage, ServerResponse } from 'node:http';
import { LoggerService } from '@/common/services/LoggerService';
import { employeeRoutes } from './employeeRoutes';
import { HttpMethods } from '@/common/enums/HttpMethods';
import { Paths } from '@/common/enums/Paths';

export class Routes {
    private static logger = new LoggerService(Routes.name).log('Initialized');

    public static async mainRouter(
        req: IncomingMessage,
        res: ServerResponse,
    ): Promise<void> {
        if (req.url === Paths.HOME && req.method === HttpMethods.GET) {
            employeeRoutes.getHome(req, res);
        } else if (
            req.url === Paths.EMPLOYEES &&
            req.method === HttpMethods.POST
        ) {
            employeeRoutes.createOne(req, res);
        } else if (
            req.url === Paths.EMPLOYEES &&
            req.method === HttpMethods.GET
        ) {
            employeeRoutes.findAll(req, res);
        } else if (
            req.url.match(/\/api\/employees\/([0-9]+)/) &&
            req.method === HttpMethods.GET
        ) {
            employeeRoutes.findOne(req, res);
        } else if (
            req.url.match(/\/api\/employees\/([0-9]+)/) &&
            req.method === HttpMethods.PUT
        ) {
            employeeRoutes.updateOne(req, res);
        } else if (
            req.url.match(/\/api\/employees\/([0-9]+)/) &&
            req.method === HttpMethods.DELETE
        ) {
            employeeRoutes.removeOne(req, res);
        } else {
            res.end(`${req.method} is not allowed for the request.`);
        }
    }
}
