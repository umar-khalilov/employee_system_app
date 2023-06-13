import { CurrencyTypes } from '@/common/enums/CurrencyTypes';
import { DepartmentTypes } from '@/common/enums/DepartmentTypes';
import { SubDepartmentTypes } from '@/common/enums/SubDepartmentTypes';

export class CreateEmployeeDto {
    readonly name: string;
    readonly salary: number;
    readonly currency: CurrencyTypes;
    readonly department: DepartmentTypes;
    readonly on_contract: boolean;
    readonly sub_department: SubDepartmentTypes;
}
