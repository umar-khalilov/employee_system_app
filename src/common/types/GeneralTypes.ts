import { EmployeeEntity } from '@/models/employees/EmployeeEntity';
import { ListTables } from '../enums/ListTables';
import { ResponseEmployeeDto } from '@/models/employees/dtos/ResponseEmployeeDto';

type TableTypes = EmployeeEntity[];

type ListGenericTables = {
    [key in ListTables]: TableTypes;
};

type TokenPayload = {
    readonly sub: number;
    readonly name: string;
    readonly email: string;
};

type TokenData = {
    readonly sub: number;
    readonly name: string;
    readonly email: string;
    readonly iat: number;
    readonly exp: number;
};

type AuthData = {
    readonly employee: ResponseEmployeeDto;
    readonly tokens: {
        readonly access: string;
        readonly refresh?: string;
    };
};

export { TableTypes, ListGenericTables, TokenPayload, TokenData, AuthData };
