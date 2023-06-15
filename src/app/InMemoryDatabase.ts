import { IDatabase } from './IDatabase';
import { CurrencyTypes } from '../common/enums/CurrencyTypes';
import { DepartmentTypes } from '../common/enums/DepartmentTypes';
import { SubDepartmentTypes } from '../common/enums/SubDepartmentTypes';
import { ListGenericTables, TableTypes } from '../common/types/GeneralTypes';
import { ListTables } from '../common/enums/ListTables';
import { LoggerService } from '../common/services/LoggerService';
import { HashService } from '../common/services/HashService';
import { EmployeeEntity } from '../models/employees/EmployeeEntity';

export class InMemoryDatabase implements IDatabase {
    private static readonly instance: InMemoryDatabase;
    private tables: ListGenericTables;
    private readonly hashService: HashService;
    private readonly logger: LoggerService;

    constructor() {
        if (InMemoryDatabase.instance) {
            return InMemoryDatabase.instance;
        }
        this.hashService = new HashService();
        this.logger = new LoggerService(InMemoryDatabase.name);
        this.seedDB();
        this.logger.log('Initialized');
    }

    public async connect(url: string): Promise<void> {
        this.logger.log(
            `Successfully connected to database ${InMemoryDatabase.name} on ${url}`,
        );
    }

    public async get(table: ListTables): Promise<TableTypes> {
        return this.tables[table];
    }

    private seedDB(): void {
        const data = [
            {
                name: 'Abhishek',
                salary: 145000,
                currency: CurrencyTypes.USD,
                department: DepartmentTypes.Engineering,
                sub_department: SubDepartmentTypes.Platform,
            },
            {
                name: 'Anurag',
                salary: 90000,
                currency: CurrencyTypes.USD,
                department: DepartmentTypes.Banking,
                on_contract: true,
                sub_department: SubDepartmentTypes.Loan,
            },
            {
                name: 'Himani',
                salary: 240000,
                currency: CurrencyTypes.USD,
                department: DepartmentTypes.Engineering,
                sub_department: SubDepartmentTypes.Platform,
            },
            {
                name: 'Yatendra',
                salary: 30,
                currency: CurrencyTypes.USD,
                department: DepartmentTypes.Operations,
                sub_department: SubDepartmentTypes.CustomerOnboarding,
            },
            {
                name: 'Ragini',
                salary: 30,
                currency: CurrencyTypes.USD,
                department: DepartmentTypes.Engineering,
                sub_department: SubDepartmentTypes.Platform,
            },
            {
                name: 'Nikhil',
                salary: 110000,
                currency: CurrencyTypes.USD,
                on_contract: true,
                department: DepartmentTypes.Engineering,
                sub_department: SubDepartmentTypes.Platform,
            },
            {
                name: 'Guljit',
                salary: 30,
                currency: CurrencyTypes.USD,
                department: DepartmentTypes.Administration,
                sub_department: SubDepartmentTypes.Agriculture,
            },
            {
                name: 'Himanshu',
                salary: 70000,
                currency: CurrencyTypes.EUR,
                department: DepartmentTypes.Operations,
                sub_department: SubDepartmentTypes.CustomerOnboarding,
            },
            {
                name: 'Anupam',
                salary: 200000000,
                currency: CurrencyTypes.INR,
                department: DepartmentTypes.Engineering,
                sub_department: SubDepartmentTypes.Platform,
            },
        ];

        const preparedData = [];

        data.forEach(async (employee, index: number) => {
            preparedData.push(
                new EmployeeEntity({
                    ...employee,
                    email: `test${index}@gmail.com`,
                    password: await this.hashService.passwordHash(
                        `3f4Ij40)LW_2!i${index}`,
                    ),
                }),
            );
        });

        this.tables = {
            [ListTables.EMPLOYEES]: preparedData,
        };
    }
}
