import { IGenericRepository } from '../abstracts/IGenericRepository';
import { EmployeeEntity } from './EmployeeEntity';
import { InMemoryDatabase } from '../../app/InMemoryDatabase';
import { LoggerService } from '../../common/services/LoggerService';
import { ListTables } from '../../common/enums/ListTables';
import { EmployeeDto } from './dtos/EmployeeDto';
import { QueryParamsDto } from './dtos/QueryParamsDto';
import { ContractTypes } from '../../common/enums/ContractTypes';

export class EmployeeRepository
    implements IGenericRepository<EmployeeDto, EmployeeEntity>
{
    private readonly database: InMemoryDatabase;
    private static readonly instance: EmployeeRepository;
    private employees: EmployeeEntity[];
    private readonly logger: LoggerService;

    constructor() {
        if (EmployeeRepository.instance) {
            return EmployeeRepository.instance;
        }
        this.logger = new LoggerService(EmployeeRepository.name);
        this.database = new InMemoryDatabase();
        void this.database.connect('www.mariadb.com');
        void this.getTable(ListTables.EMPLOYEES);
        this.logger.log('Initialized');
    }

    private async getTable(table: ListTables): Promise<void> {
        this.employees = await this.database.get(table);
    }

    async findAll(query: QueryParamsDto): Promise<Array<EmployeeEntity>> {
        const isEmpty = Object.values(query).every(
            value => value === undefined,
        );

        if (!isEmpty) {
            return this.employees.filter(
                employee => this.processConditions(query, employee) && employee,
            );
        } else {
            return this.employees;
        }
    }

    private processConditions(
        query: QueryParamsDto,
        employee: EmployeeEntity,
    ): boolean {
        let on_contract: boolean;
        if (query?.on_contract === ContractTypes.false) {
            on_contract = false;
        } else if (query?.on_contract === ContractTypes.true) {
            on_contract = true;
        }

        const fields = {
            department: query?.department,
            sub_department: query?.subdepartment,
            on_contract,
        };

        return (
            fields.on_contract === employee.on_contract ||
            fields.department === employee.department ||
            fields.sub_department === employee.sub_department
        );
    }

    async findOne(id: number): Promise<EmployeeEntity> {
        return this.employees.find(employee => employee.id === id);
    }

    async findByEmail(email: string): Promise<EmployeeEntity> {
        return this.employees.find(employee => employee.email === email);
    }

    async createOne(data: EmployeeDto): Promise<EmployeeEntity> {
        const employee = new EmployeeEntity(data);
        this.employees.push(employee);
        return employee;
    }

    async updateOne(id: number, data: EmployeeDto): Promise<EmployeeEntity> {
        const employee = await this.findOne(id);
        if (employee) {
            Object.assign(employee, data);
            return employee;
        }
    }

    async removeOne(id: number): Promise<boolean> {
        const index = this.employees.findIndex(employee => employee.id === id);

        if (index !== -1) {
            this.employees.splice(index, 1);
            return true;
        }
        return false;
    }
}

export const employeeRepository = new EmployeeRepository();
