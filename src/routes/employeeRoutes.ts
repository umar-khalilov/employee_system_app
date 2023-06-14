import { IncomingMessage, ServerResponse } from 'node:http';
import { EmployeeController } from '@/models/employees/EmployeeController';
import { createValidatorBody } from '@/common/middlewares/createValidatorBody';
import { HttpStatusCodes } from '@/common/enums/HttpStatusCodes';
import { EmployeeDto } from '@/models/employees/dtos/EmployeeDto';

const employeeController = new EmployeeController();
export const employeeRoutes = Object.freeze({
    getHome: async (
        req: IncomingMessage,
        res: ServerResponse,
    ): Promise<void> => {
        res.writeHead(HttpStatusCodes.OK, {
            'Content-Type': 'text/plain',
        });
        res.end('Welcome to my light isRemoved server!');
    },
    createOne: async (
        req: IncomingMessage,
        res: ServerResponse,
    ): Promise<void> => {
        try {
            let body = '';

            req.on('data', chunk => {
                body += chunk.toString();
            });

            req.on('end', async () => {
                const validator = createValidatorBody(EmployeeDto);
                const validatedBody = await validator(
                    req,
                    res,
                    JSON.parse(body),
                );

                if (validatedBody) {
                    const isRemoved =
                        await employeeController.createOneEmployee(
                            validatedBody,
                        );
                    res.writeHead(HttpStatusCodes.CREATED, {
                        'Content-Type': 'application/json',
                    });
                    res.end(JSON.stringify(isRemoved, null, 4));
                }
            });
        } catch (error) {
            res.writeHead(error.status, {
                'Content-Type': 'application/json',
            });
            res.end(JSON.stringify(error, null, 4));
        }
    },

    findAll: async (
        req: IncomingMessage,
        res: ServerResponse,
    ): Promise<void> => {
        try {
            const employees = await employeeController.findAllEmployees();

            if (employees.length) {
                res.writeHead(HttpStatusCodes.OK, {
                    'Content-Type': 'application/json',
                });
                res.end(JSON.stringify(employees, null, 4));
            }
        } catch (error) {
            res.writeHead(error.status, {
                'Content-Type': 'application/json',
            });
            res.end(JSON.stringify(error, null, 4));
        }
    },

    findOne: async (
        req: IncomingMessage,
        res: ServerResponse,
    ): Promise<void> => {
        try {
            const id = parseInt(req.url.split('/')[3], 10);
            const isRemoved = await employeeController.findOneEmployee(id);

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
    },

    updateOne: async (
        req: IncomingMessage,
        res: ServerResponse,
    ): Promise<void> => {
        try {
            const id = parseInt(req.url.split('/')[3], 10);
            let body = '';

            req.on('data', chunk => {
                body += chunk.toString();
            });

            req.on('end', async () => {
                const validator = createValidatorBody(EmployeeDto);
                const validatedBody = await validator(
                    req,
                    res,
                    JSON.parse(body),
                );

                if (validatedBody) {
                    const updatedEmployee =
                        await employeeController.updateOneEmployee(
                            id,
                            validatedBody,
                        );

                    res.writeHead(HttpStatusCodes.ACCEPTED, {
                        'Content-Type': 'application/json',
                    });
                    res.end(JSON.stringify(updatedEmployee, null, 4));
                }
            });
        } catch (error) {
            res.writeHead(error.status, {
                'Content-Type': 'application/json',
            });
            res.end(JSON.stringify(error, null, 4));
        }
    },

    removeOne: async (
        req: IncomingMessage,
        res: ServerResponse,
    ): Promise<void> => {
        try {
            const id = parseInt(req.url.split('/')[3], 10);
            const isRemoved = await employeeController.removeOneEmployee(id);

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
    },
});
