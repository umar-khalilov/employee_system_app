import { AuthService, authService } from '../AuthService';
import { EmployeeAlreadyExistException } from './../../common/exceptions/EmployeeAlreadyExistException';
import { DepartmentTypes } from './../../common/enums/DepartmentTypes';
import { CurrencyTypes } from '../../common/enums/CurrencyTypes';
import { SubDepartmentTypes } from '../../common/enums/SubDepartmentTypes';
import { EmployeeDto } from '../../models/employees/dtos/EmployeeDto';
import { SignInDto } from '../SignInDto';
import { UnauthorizedException } from './../../common/exceptions/UnauthorizedException';

describe(`The ${AuthService.name}`, () => {
    describe('when registering an employee', () => {
        describe('if the email is already taken', () => {
            it('should throw an error', async () => {
                const data: EmployeeDto = {
                    name: 'testAuth',
                    email: 'test0@gmail.com',
                    salary: 422222,
                    currency: CurrencyTypes.USD,
                    department: DepartmentTypes.Administration,
                    sub_department: SubDepartmentTypes.Platform,
                    on_contract: false,
                    password: 'kdkdjs93j329fIu9',
                };

                await expect(authService.signUp(data)).rejects.toMatchObject(
                    new EmployeeAlreadyExistException(data.email),
                );
            });
        });

        describe('if the email is not taken', () => {
            it('should not throw an error', async () => {
                const data: EmployeeDto = {
                    name: 'testAuth',
                    email: 'test100@gmail.com',
                    salary: 422222,
                    currency: CurrencyTypes.USD,
                    department: DepartmentTypes.Administration,
                    sub_department: SubDepartmentTypes.Platform,
                    on_contract: false,
                    password: 'kdkdjs93j329fIu9',
                };

                await expect(authService.signUp(data)).resolves.toBeDefined();
            });
        });
    });

    describe('when login en employee', () => {
        describe('if the email is already taken', () => {
            it('should not throw an error', async () => {
                const data: SignInDto = {
                    email: 'test0@gmail.com',
                    password: '3f4Ij40)LW_2!i0',
                };

                await expect(authService.signIn(data)).resolves.toBeDefined();
            });
        });

        describe('if the email is not taken', () => {
            it('should throw an error', async () => {
                const data: SignInDto = {
                    email: 'test000@gmail.com',
                    password: '3f4Ij40)LW_2!i0',
                };

                await expect(authService.signIn(data)).rejects.toMatchObject(
                    new UnauthorizedException(),
                );
            });
        });
    });
});
