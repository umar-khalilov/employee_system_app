import { IsEnum, IsOptional } from 'class-validator';
import { DepartmentTypes } from '../../../common/enums/DepartmentTypes';
import { SubDepartmentTypes } from '../../../common/enums/SubDepartmentTypes';
import { ContractTypes } from '../../../common/enums/ContractTypes';

export class QueryParamsDto {
    @IsEnum(DepartmentTypes, { message: 'department must be an enum value' })
    @IsOptional()
    readonly department?: DepartmentTypes;

    @IsEnum(SubDepartmentTypes, {
        message: 'subdepartment must be an enum value',
    })
    @IsOptional()
    readonly subdepartment?: SubDepartmentTypes;

    @IsEnum(ContractTypes, { message: 'contract must be an enum value' })
    @IsOptional()
    readonly on_contract?: ContractTypes;
}
