import { EmployeeEntity } from '@/models/employees/EmployeeEntity';
import { ListTables } from '../enums/ListTables';

type TableTypes = EmployeeEntity[];

type ListGenericTables = {
    [key in ListTables]: TableTypes;
};

type TokenPayload = {
    readonly sub: number;
    readonly name: string;
    readonly email: string;
};

type AuthData = {
    readonly employee: Partial<EmployeeEntity>;
    readonly tokens: {
        readonly access: string;
        readonly refresh?: string;
    };
};

export { TableTypes, ListGenericTables, TokenPayload, AuthData };
