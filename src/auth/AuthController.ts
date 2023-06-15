import { EmployeeDto } from '@/models/employees/dtos/EmployeeDto';
import { AuthService } from './AuthService';
import { LoggerService } from '@/common/services/LoggerService';
import { SignInDto } from './SignInDto';
import { IncomingMessage, ServerResponse } from 'http';
import { getReqData } from '@/common/utils/helpers';
import { createValidatorBody } from '@/common/middlewares/createValidatorBody';
import { HttpStatusCodes } from '@/common/enums/HttpStatusCodes';

export class AuthController {
    private readonly authService: AuthService;
    private readonly logger: LoggerService;

    constructor() {
        this.logger = new LoggerService(AuthController.name);
        this.authService = new AuthService();
        this.logger.log('Initialized');
    }

    async signUp(req: IncomingMessage, res: ServerResponse): Promise<void> {
        try {
            const body = await getReqData(req);
            const validator = createValidatorBody(EmployeeDto);
            const validatedBody = await validator(req, res, JSON.parse(body));

            if (validatedBody) {
                const authData = await this.authService.signUp(validatedBody);
                res.writeHead(HttpStatusCodes.CREATED, {
                    'Content-Type': 'application/json',
                });
                res.end(JSON.stringify(authData, null, 4));
            }
        } catch (error) {
            res.writeHead(error.status, {
                'Content-Type': 'application/json',
            });
            res.end(JSON.stringify(error, null, 4));
        }
    }

    async signIn(req: IncomingMessage, res: ServerResponse): Promise<void> {
        try {
            const body = await getReqData(req);
            const validator = createValidatorBody(SignInDto);
            const validatedBody = await validator(req, res, JSON.parse(body));

            if (validatedBody) {
                const authData = await this.authService.signIn(validatedBody);
                res.writeHead(HttpStatusCodes.CREATED, {
                    'Content-Type': 'application/json',
                });
                res.end(JSON.stringify(authData, null, 4));
            }
        } catch (error) {
            res.writeHead(error.status, {
                'Content-Type': 'application/json',
            });
            res.end(JSON.stringify(error, null, 4));
        }
    }
}
