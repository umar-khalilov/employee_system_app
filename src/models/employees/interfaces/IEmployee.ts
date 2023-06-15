import { QueryParamsDto } from '../dtos/QueryParamsDto';

export interface IEmployee {
    findAllEmployees(query: QueryParamsDto): Promise<object[]>;
    findOneEmployee(id: number): Promise<object>;
    createOneEmployee(data: object): Promise<object>;
    updateOneEmployee(id: number, data: object): Promise<object>;
    removeOneEmployee(id: number): Promise<boolean>;
}
