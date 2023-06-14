import { LoggerService } from '@/common/services/LoggerService';
import { IGenericRepository } from '../abstracts/IGenericRepository';
import { EmployeeEntity } from './EmployeeEntity';
import { InMemoryDatabase } from '@/app/InMemoryDatabase';
import { ListTables } from '@/common/enums/ListTables';
import { EmployeeDto } from './dtos/EmployeeDto';

export class EmployeeRepository
    implements IGenericRepository<EmployeeDto, EmployeeEntity>
{
    private readonly database: InMemoryDatabase;
    private employees: EmployeeEntity[];
    private readonly logger: LoggerService;

    constructor() {
        this.logger = new LoggerService(EmployeeRepository.name);
        this.database = new InMemoryDatabase();
        void this.database.connect('www.mariadb.com');
        void this.getTable(ListTables.EMPLOYEES);
        this.logger.log('Initialized');
    }

    async getTable(table: ListTables): Promise<void> {
        this.employees = await this.database.get(table);
    }

    async findAll(): Promise<Array<EmployeeEntity>> {
        return this.employees;
    }

    async findOne(id): Promise<EmployeeEntity> {
        return this.employees.find(employee => employee.id === id);
    }

    async createOne(data: EmployeeDto): Promise<EmployeeEntity> {
        const employee = new EmployeeEntity(data);
        this.employees.push(employee);
        return employee;
    }

    async updateOne(id: number, data: EmployeeDto): Promise<EmployeeEntity> {
        const employee = await this.findOne(id);
        Object.assign(employee, data);
        return employee;
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
