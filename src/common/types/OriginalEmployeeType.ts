import { CurrencyTypes } from '../enums/CurrencyTypes';
import { DepartmentTypes } from '../enums/DepartmentTypes';
import { SubDepartmentTypes } from '../enums/SubDepartmentTypes';

export type OriginalEmployeeType = {
    name: string;
    salary: number;
    currency: CurrencyTypes;
    department: DepartmentTypes;
    on_contract?: boolean;
    sub_department: SubDepartmentTypes;
};
