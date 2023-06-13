import { AbstractEntity } from '../abstracts/AbstractEntity';
import { CurrencyTypes } from '@/common/enums/CurrencyTypes';
import { DepartmentTypes } from '@/common/enums/DepartmentTypes';
import { SubDepartmentTypes } from '@/common/enums/SubDepartmentTypes';
import { CreateEmployeeDto } from './dtos/CreateEmployeeDto';

export class EmployeeEntity extends AbstractEntity {
    name: string;
    salary: number;
    currency: CurrencyTypes;
    department: DepartmentTypes;
    on_contract?: boolean;
    sub_department: SubDepartmentTypes;

    constructor(data: CreateEmployeeDto) {
        super();
        this.name = data.name;
        this.salary = data.salary;
        this.currency = data.currency;
        this.department = data.department;
        this.on_contract = data.on_contract;
        this.sub_department = data.sub_department;
    }
}
