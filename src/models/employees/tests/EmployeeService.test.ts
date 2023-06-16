import { EmployeeService, employeeService } from '../EmployeeService';
import { QueryParamsDto } from '../dtos/QueryParamsDto';
import { EmployeeDto } from '../dtos/EmployeeDto';
import { CurrencyTypes } from './../../../common/enums/CurrencyTypes';
import { ContractTypes } from './../../../common/enums/ContractTypes';
import { SubDepartmentTypes } from './../../../common/enums/SubDepartmentTypes';
import { DepartmentTypes } from './../../../common/enums/DepartmentTypes';
import { NotFoundException } from './../../../common/exceptions/NotFoundException';

describe(`The ${EmployeeService.name}`, () => {
    describe('when find employee by id', () => {
        describe('if the employee with that id is already exist', () => {
            it('should return an object containing all data of this employee', async () => {
                await expect(
                    employeeService.findOneEmployee(1),
                ).resolves.toBeDefined();
            });
        });

        describe('if the employee with that id is not exist', () => {
            it('should throw an error', async () => {
                const id = 0;
                await expect(
                    employeeService.findOneEmployee(id),
                ).rejects.toMatchObject(
                    new NotFoundException(
                        `Employee with that id: ${id} not found`,
                    ),
                );
            });
        });
    });

    describe('when get all employees without query params', () => {
        describe('if the employees exist in database', () => {
            it('should return an array of objects containing all data of this employee', async () => {
                const query: QueryParamsDto = {
                    department: undefined,
                    subdepartment: undefined,
                    contract: undefined,
                };
                await expect(
                    employeeService.findAllEmployees(query),
                ).resolves.toBeDefined();
            });
        });

        describe('if the employees with query param', () => {
            it('should return employees', async () => {
                const query: QueryParamsDto = {
                    department: undefined,
                    subdepartment: undefined,
                    contract: ContractTypes.true,
                };
                await expect(
                    employeeService.findAllEmployees(query),
                ).resolves.toBeDefined();
            });
        });
    });

    describe('when update employee by id', () => {
        describe('if the employee exist in database', () => {
            it('should return an object containing all data of this employee', async () => {
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
                await expect(
                    employeeService.updateOneEmployee(1, data),
                ).resolves.toBeDefined();
            });
        });

        describe('if the employee not exist in database', () => {
            it('should throw an error', async () => {
                const id = 0;
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
                await expect(
                    employeeService.updateOneEmployee(id, data),
                ).rejects.toMatchObject(
                    new NotFoundException(
                        `Employee with that id: ${id} not found`,
                    ),
                );
            });
        });
    });

    describe('when remove employee by id', () => {
        describe('if the employee exist in database', () => {
            it('should not throw an error', async () => {
                await expect(
                    employeeService.removeOneEmployee(5),
                ).resolves.toBeDefined();
            });
        });

        describe('if the employee not exist in database', () => {
            it('should throw an error', async () => {
                const id = 0;
                await expect(
                    employeeService.removeOneEmployee(id),
                ).rejects.toMatchObject(
                    new NotFoundException(
                        `Employee with that id: ${id} was not found`,
                    ),
                );
            });
        });
    });
});
