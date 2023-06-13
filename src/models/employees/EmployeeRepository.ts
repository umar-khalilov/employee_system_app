import { LoggerService } from '@/common/services/LoggerService';
import { IGenericRepository } from '../abstracts/IGenericRepository';
import { EmployeeEntity } from './EmployeeEntity';
import { CreateEmployeeDto } from './dtos/CreateEmployeeDto';
import { InMemoryDatabase } from '@/app/InMemoryDatabase';
import { ListTables } from '@/common/enums/ListTables';

export class EmployeeRepository
    implements IGenericRepository<CreateEmployeeDto, EmployeeEntity>
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

    async findOne(id: number): Promise<EmployeeEntity> {
        return this.employees.find(employee => employee.id === id);
    }

    async createOne(data: CreateEmployeeDto): Promise<EmployeeEntity> {
        const employee = new EmployeeEntity(data);
        this.employees.push(employee);
        return employee;
    }

    async updateOne(
        id: number,
        data: CreateEmployeeDto,
    ): Promise<EmployeeEntity> {
        const employee = await this.findOne(id);
        Object.assign(employee, data);
        return employee;
    }
}
