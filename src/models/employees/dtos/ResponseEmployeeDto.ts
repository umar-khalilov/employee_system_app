import { EmployeeEntity } from '../EmployeeEntity';
import { CurrencyTypes } from '../../../common/enums/CurrencyTypes';
import { DepartmentTypes } from '../../../common/enums/DepartmentTypes';
import { SubDepartmentTypes } from '../../../common/enums/SubDepartmentTypes';

export class ResponseEmployeeDto {
    readonly id: number;
    readonly name: string;
    readonly email: string;
    readonly salary: number;
    readonly currency: CurrencyTypes;
    readonly department: DepartmentTypes;
    readonly on_contract?: boolean;
    readonly sub_department: SubDepartmentTypes;

    constructor(entity: EmployeeEntity) {
        this.id = entity.id;
        this.name = entity.name;
        this.email = entity.email;
        this.salary = entity.salary;
        this.currency = entity.currency;
        this.department = entity.department;
        this.on_contract = entity?.on_contract;
        this.sub_department = entity.sub_department;
    }
}
