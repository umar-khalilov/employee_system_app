import { CurrencyTypes } from '@/common/enums/CurrencyTypes';
import { DepartmentTypes } from '@/common/enums/DepartmentTypes';
import { SubDepartmentTypes } from '@/common/enums/SubDepartmentTypes';
import { EmployeeDto } from './dtos/EmployeeDto';

let serialId = 9;
export class EmployeeEntity {
    readonly id: number;
    name: string;
    email: string;
    salary: number;
    currency: CurrencyTypes;
    department: DepartmentTypes;
    on_contract?: boolean;
    sub_department: SubDepartmentTypes;
    password: string;
    readonly created_at: Date;

    constructor(data: EmployeeDto) {
        this.id = ++serialId;
        this.name = data.name;
        this.email = data.email;
        this.salary = data.salary;
        this.currency = data.currency;
        this.department = data.department;
        this.on_contract = data.on_contract;
        this.sub_department = data.sub_department;
        this.password = data.password;
        this.created_at = new Date();
    }
}
