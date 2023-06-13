import { IDatabase } from './IDatabase';
import { CurrencyTypes } from '@/common/enums/CurrencyTypes';
import { DepartmentTypes } from '@/common/enums/DepartmentTypes';
import { SubDepartmentTypes } from '@/common/enums/SubDepartmentTypes';
import { ListGenericTables, TableTypes } from '@/common/types/GeneralTypes';
import { ListTables } from '../common/enums/ListTables';
import { LoggerService } from '@/common/services/LoggerService';

export class InMemoryDatabase implements IDatabase {
    private static readonly instance: InMemoryDatabase;
    private readonly tables: ListGenericTables;
    private readonly logger: LoggerService;

    constructor() {
        if (InMemoryDatabase.instance) {
            return InMemoryDatabase.instance;
        }
        this.logger = new LoggerService(InMemoryDatabase.name);
        this.tables = {
            [ListTables.EMPLOYEES]: [
                {
                    id: 1,
                    name: 'Abhishek',
                    salary: 145000,
                    currency: CurrencyTypes.USD,
                    department: DepartmentTypes.Engineering,
                    sub_department: SubDepartmentTypes.Platform,
                    created_at: new Date(),
                },
                {
                    id: 2,
                    name: 'Anurag',
                    salary: 90000,
                    currency: CurrencyTypes.USD,
                    department: DepartmentTypes.Banking,
                    on_contract: true,
                    sub_department: SubDepartmentTypes.Loan,
                    created_at: new Date(),
                },
                {
                    id: 3,
                    name: 'Himani',
                    salary: 240000,
                    currency: CurrencyTypes.USD,
                    department: DepartmentTypes.Engineering,
                    sub_department: SubDepartmentTypes.Platform,
                    created_at: new Date(),
                },
                {
                    id: 4,
                    name: 'Yatendra',
                    salary: 30,
                    currency: CurrencyTypes.USD,
                    department: DepartmentTypes.Operations,
                    sub_department: SubDepartmentTypes.CustomerOnboarding,
                    created_at: new Date(),
                },
                {
                    id: 5,
                    name: 'Ragini',
                    salary: 30,
                    currency: CurrencyTypes.USD,
                    department: DepartmentTypes.Engineering,
                    sub_department: SubDepartmentTypes.Platform,
                    created_at: new Date(),
                },
                {
                    id: 6,
                    name: 'Nikhil',
                    salary: 110000,
                    currency: CurrencyTypes.USD,
                    on_contract: true,
                    department: DepartmentTypes.Engineering,
                    sub_department: SubDepartmentTypes.Platform,
                    created_at: new Date(),
                },
                {
                    id: 7,
                    name: 'Guljit',
                    salary: 30,
                    currency: CurrencyTypes.USD,
                    department: DepartmentTypes.Administration,
                    sub_department: SubDepartmentTypes.Agriculture,
                    created_at: new Date(),
                },
                {
                    id: 8,
                    name: 'Himanshu',
                    salary: 70000,
                    currency: CurrencyTypes.EUR,
                    department: DepartmentTypes.Operations,
                    sub_department: SubDepartmentTypes.CustomerOnboarding,
                    created_at: new Date(),
                },
                {
                    id: 9,
                    name: 'Anupam',
                    salary: 200000000,
                    currency: CurrencyTypes.INR,
                    department: DepartmentTypes.Engineering,
                    sub_department: SubDepartmentTypes.Platform,
                    created_at: new Date(),
                },
            ],
        };
        this.logger.log('Initialized');
    }

    async connect(url: string): Promise<void> {
        this.logger.log(
            `Successfully connected to database ${InMemoryDatabase.name} on ${url}`,
        );
    }

    async get(table: ListTables): Promise<TableTypes> {
        return this.tables[table];
    }
}
