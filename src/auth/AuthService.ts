import { EmployeeAlreadyExistException } from '../common/exceptions/EmployeeAlreadyExistException';
import { UnauthorizedException } from '../common/exceptions/UnauthorizedException';
import { HashService } from '../common/services/HashService';
import { JWTService, jwtService } from '../common/services/JWTService';
import { LoggerService } from '../common/services/LoggerService';
import { AuthData, TokenPayload } from '../common/types/GeneralTypes';
import { EmployeeEntity } from '../models/employees/EmployeeEntity';
import {
    EmployeeService,
    employeeService,
} from '../models/employees/EmployeeService';
import { EmployeeDto } from '../models/employees/dtos/EmployeeDto';
import { SignInDto } from './SignInDto';
import { ResponseEmployeeDto } from '../models/employees/dtos/ResponseEmployeeDto';

export class AuthService {
    private static readonly instance: AuthService;
    private readonly employeeService: EmployeeService;
    private readonly jwtService: JWTService;
    private readonly hashService: HashService;
    private readonly logger: LoggerService;

    constructor() {
        if (AuthService.instance) {
            return AuthService.instance;
        }
        this.logger = new LoggerService(AuthService.name);
        this.employeeService = employeeService;
        this.hashService = new HashService();
        this.jwtService = jwtService;
        this.logger.log('Initialized');
    }

    private async validateEmployee(
        email: string,
        password: string,
    ): Promise<EmployeeEntity> {
        const newEmployee = await this.employeeService.findEmployeeByEmail(
            email,
        );

        if (
            newEmployee &&
            (await this.hashService.checkIsMatch(
                password,
                newEmployee?.password,
            ))
        ) {
            return newEmployee;
        }
        throw new UnauthorizedException();
    }

    async signUp(data: EmployeeDto): Promise<AuthData> {
        const candidate = await this.employeeService.findEmployeeByEmail(
            data.email,
        );
        if (candidate) {
            throw new EmployeeAlreadyExistException(candidate.email);
        }
        const newEmployee = await this.employeeService.createOneEmployee({
            ...data,
            password: await this.hashService.passwordHash(data.password),
        });

        const payload: TokenPayload = {
            sub: newEmployee.id,
            name: newEmployee.name,
            email: newEmployee.email,
        };

        const accessToken = await this.jwtService.generateAccessJWT(payload);
        const employee = new ResponseEmployeeDto(newEmployee);
        return { employee, tokens: { access: accessToken } };
    }

    async signIn({ email, password }: SignInDto): Promise<AuthData> {
        const validatedEmployee = await this.validateEmployee(email, password);

        const payload: TokenPayload = {
            sub: validatedEmployee.id,
            name: validatedEmployee.name,
            email: validatedEmployee.email,
        };

        const accessToken = await this.jwtService.generateAccessJWT(payload);
        const employee = new ResponseEmployeeDto(validatedEmployee);
        return { employee, tokens: { access: accessToken } };
    }
}

export const authService = new AuthService();
