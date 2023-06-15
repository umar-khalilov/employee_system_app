import { IncomingMessage, ServerResponse } from 'node:http';
import { EmployeeService, employeeService } from './EmployeeService';
import { EmployeeDto } from './dtos/EmployeeDto';
import { QueryParamsDto } from './dtos/QueryParamsDto';
import { createValidatorQuery } from '@/common/middlewares/createValidatorQuery';
import { HttpStatusCodes } from '@/common/enums/HttpStatusCodes';
import { getReqData } from '@/common/utils/helpers';
import { createValidatorBody } from '@/common/middlewares/createValidatorBody';

export class EmployeeController {
    private static readonly instance: EmployeeController;
    private readonly employeeService: EmployeeService;

    constructor() {
        if (EmployeeController.instance) {
            return EmployeeController.instance;
        }
        this.employeeService = employeeService;
    }

    async findAllEmployees(
        req: IncomingMessage,
        res: ServerResponse,
        searchParams: URLSearchParams,
    ): Promise<Promise<void>> {
        try {
            const query = Object.fromEntries(searchParams.entries());
            const validator = createValidatorQuery(QueryParamsDto);
            const validatedQuery = await validator(req, res, query);

            if (validatedQuery) {
                const employees = await this.employeeService.findAllEmployees(
                    validatedQuery,
                );

                if (employees.length) {
                    res.writeHead(HttpStatusCodes.OK, {
                        'Content-Type': 'application/json',
                    });
                    res.end(JSON.stringify(employees, null, 4));
                }
            }
        } catch (error) {
            res.writeHead(error.status, {
                'Content-Type': 'application/json',
            });
            res.end(JSON.stringify(error, null, 4));
        }
    }

    async findOneEmployee(
        req: IncomingMessage,
        res: ServerResponse,
    ): Promise<void> {
        try {
            const id = parseInt(req.url.split('/')[3], 10);
            const isRemoved = await this.employeeService.findOneEmployee(id);

            if (isRemoved) {
                res.writeHead(HttpStatusCodes.OK, {
                    'Content-Type': 'application/json',
                });
                res.end(JSON.stringify(isRemoved, null, 4));
            }
        } catch (error) {
            res.writeHead(error.status, {
                'Content-Type': 'application/json',
            });
            res.end(JSON.stringify(error, null, 4));
        }
    }

    async updateOneEmployee(
        req: IncomingMessage,
        res: ServerResponse,
    ): Promise<void> {
        try {
            const id = parseInt(req.url.split('/')[3], 10);
            const body = await getReqData(req);
            const validator = createValidatorBody(EmployeeDto);
            const validatedBody = await validator(req, res, JSON.parse(body));

            if (validatedBody) {
                const updatedEmployee =
                    await this.employeeService.updateOneEmployee(
                        id,
                        validatedBody,
                    );

                res.writeHead(HttpStatusCodes.ACCEPTED, {
                    'Content-Type': 'application/json',
                });
                res.end(JSON.stringify(updatedEmployee, null, 4));
            }
        } catch (error) {
            res.writeHead(error.status, {
                'Content-Type': 'application/json',
            });
            res.end(JSON.stringify(error, null, 4));
        }
    }

    async removeOneEmployee(
        req: IncomingMessage,
        res: ServerResponse,
    ): Promise<void> {
        try {
            const id = parseInt(req.url.split('/')[3], 10);
            const isRemoved = await this.employeeService.removeOneEmployee(id);

            if (isRemoved) {
                res.writeHead(HttpStatusCodes.NO_CONTENT);
                res.end();
            }
        } catch (error) {
            res.writeHead(error.status, {
                'Content-Type': 'application/json',
            });
            res.end(JSON.stringify(error, null, 4));
        }
    }
}

export const employeeController = new EmployeeController();
