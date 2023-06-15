import { IncomingMessage, ServerResponse } from 'node:http';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { ValidationError, validate } from 'class-validator';
import { BadRequestException } from '../exceptions/BadRequestException';
import { HttpStatusCodes } from '../enums/HttpStatusCodes';

export const createValidatorQuery = <T extends object>(
    classInstance: ClassConstructor<T>,
) => {
    return async (req: IncomingMessage, res: ServerResponse, query: object) => {
        const convertedObject = plainToInstance(classInstance, query);
        return validate(convertedObject).then((errors: ValidationError[]) => {
            if (errors.length > 0) {
                const rawErrors = errors
                    .map((error: ValidationError) =>
                        Object.values(error.constraints ?? []),
                    )
                    .flat(2);

                res.writeHead(HttpStatusCodes.BAD_REQUEST, {
                    'Content-Type': 'application/json',
                });
                res.end(
                    JSON.stringify(
                        new BadRequestException(
                            'Query validation failed!',
                            rawErrors,
                        ),
                        null,
                        4,
                    ),
                );
            } else {
                return convertedObject;
            }
        });
    };
};
