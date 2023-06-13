import { EmployeeEntity } from '@/models/employees/EmployeeEntity';
import { ListTables } from '../enums/ListTables';

type TableTypes = EmployeeEntity[];

type ListGenericTables = {
    [key in ListTables]: TableTypes;
};

export { TableTypes, ListGenericTables };
