import { TableTypes } from '@/common/types/GeneralTypes';
import { ListTables } from '../common/enums/ListTables';

export interface IDatabase {
    connect(url: string): Promise<void>;
    get(table: ListTables): Promise<TableTypes>;
}
