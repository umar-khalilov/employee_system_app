import { QueryParamsDto } from '../employees/dtos/QueryParamsDto';

export interface IGenericRepository<I, O> {
    createOne(data: I): Promise<O>;
    findAll(query: QueryParamsDto): Promise<O[]>;
    findOne(id: number): Promise<O>;
    updateOne(id: number, data: I): Promise<O>;
    removeOne(id: number): Promise<boolean>;
}
