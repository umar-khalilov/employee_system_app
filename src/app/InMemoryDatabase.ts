import { IDatabase } from './IDatabase';
import { CurrencyTypes } from '@/common/enums/CurrencyTypes';
import { DepartmentTypes } from '@/common/enums/DepartmentTypes';
import { SubDepartmentTypes } from '@/common/enums/SubDepartmentTypes';
import { ListGenericTables, TableTypes } from '@/common/types/GeneralTypes';
import { ListTables } from '../common/enums/ListTables';
import { LoggerService } from '@/common/services/LoggerService';
import { EmployeeEntity } from '@/models/employees/EmployeeEntity';
import { HashService } from '@/common/services/HashService';
import { OriginalEmployeeType } from '@/common/types/OriginalEmployeeType';

export class InMemoryDatabase implements IDatabase {
    private static readonly instance: InMemoryDatabase;
    private readonly tables: ListGenericTables;
    private readonly hashService: HashService;
    private readonly logger: LoggerService;

    constructor() {
        if (InMemoryDatabase.instance) {
            return InMemoryDatabase.instance;
        }
        this.logger = new LoggerService(InMemoryDatabase.name);
        this.hashService = new HashService();
        this.tables = {
            [ListTables.EMPLOYEES]: this.seedDatabase(),
        };
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

    private seedDatabase(): EmployeeEntity[] {
        const employees: OriginalEmployeeType[] = [
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

        const data = [];
        employees.forEach(
            async (employee: OriginalEmployeeType, index: number) => {
                data.push({
                    id: ++index,
                    name: employee.name,
                    salary: employee.salary,
                    currency: employee.currency,
                    department: employee.department,
                    on_contract: employee?.on_contract
                        ? employee?.on_contract
                        : null,
                    sub_department: employee.sub_department,
                    email: `test${index}@mail.com`,
                    password: await this.hashService.passwordHash(
                        `3f4Ij40)LW_2!iOne${index}`,
                    ),
                    created_at: new Date(),
                });
            },
        );
        return data;
    }
}
