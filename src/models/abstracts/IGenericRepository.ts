export interface IGenericRepository<I, O> {
    createOne(data: I): Promise<O>;
    findAll(): Promise<O[]>;
    findOne(id: number): Promise<O>;
    updateOne(id: number, data: I): Promise<O>;
}
