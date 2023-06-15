import { EmployeeAlreadyExistException } from '@/common/exceptions/EmployeeAlreadyExistException';
import { UnauthorizedException } from '@/common/exceptions/UnauthorizedException';
import { HashService } from '@/common/services/HashService';
import { JWTService } from '@/common/services/JWTService';
import { LoggerService } from '@/common/services/LoggerService';
import { AuthData, TokenPayload } from '@/common/types/GeneralTypes';
import { EmployeeEntity } from '@/models/employees/EmployeeEntity';
import { EmployeeService } from '@/models/employees/EmployeeService';
import { EmployeeDto } from '@/models/employees/dtos/EmployeeDto';
import { SignInDto } from './SignInDto';

export class AuthService {
    private readonly employeeService: EmployeeService;
    private readonly jwtService: JWTService;
    private readonly hashService: HashService;
    private readonly logger: LoggerService;

    constructor() {
        this.logger = new LoggerService(AuthService.name);
        this.employeeService = new EmployeeService();
        this.hashService = new HashService();
        this.jwtService = new JWTService();
        this.logger.log('Initialized');
    }

    async validateEmployee(
        email: string,
        password: string,
    ): Promise<EmployeeEntity> {
        const employee = await this.employeeService.findEmployeeByEmail(email);

        if (
            employee &&
            (await this.hashService.checkIsMatch(password, employee?.password))
        ) {
            return employee;
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
        const employee = await this.employeeService.createOneEmployee({
            ...data,
            password: await this.hashService.passwordHash(data.password),
        });

        const payload: TokenPayload = {
            sub: employee.id,
            name: employee.name,
            email: employee.email,
        };

        employee.password = null;
        const accessToken = await this.jwtService.generateAccessJWT(payload);

        return { employee, tokens: { access: accessToken } };
    }

    async signIn({ email, password }: SignInDto): Promise<AuthData> {
        const employee = await this.validateEmployee(email, password);

        const payload: TokenPayload = {
            sub: employee.id,
            name: employee.name,
            email: employee.email,
        };
        employee.password = null;
        const accessToken = await this.jwtService.generateAccessJWT(payload);
        return { employee, tokens: { access: accessToken } };
    }
}
