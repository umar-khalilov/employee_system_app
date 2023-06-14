import {
    IsBoolean,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';
import { CurrencyTypes } from '@/common/enums/CurrencyTypes';
import { DepartmentTypes } from '@/common/enums/DepartmentTypes';
import { SubDepartmentTypes } from '@/common/enums/SubDepartmentTypes';

export class EmployeeDto {
    @IsString({ message: 'name must me a string value' })
    @IsNotEmpty({ message: 'name cannot be an empty value' })
    readonly name: string;

    @IsNumber({}, { message: 'salary must be a number value' })
    @IsNotEmpty({ message: 'salary cannot be an empty value' })
    readonly salary: number;

    @IsEnum(CurrencyTypes, { message: 'currency must be an enum value' })
    @IsNotEmpty({ message: 'currency cannot be an empty value' })
    readonly currency: CurrencyTypes;

    @IsEnum(DepartmentTypes, { message: 'department must be an enum value' })
    @IsNotEmpty({ message: 'department cannot be an empty value' })
    readonly department: DepartmentTypes;

    @IsBoolean({ message: 'on_contract must be an boolean value' })
    @IsOptional({ message: 'on_contract is optional value' })
    readonly on_contract?: boolean;

    @IsEnum(SubDepartmentTypes, {
        message: 'sub_department must be an enum value',
    })
    @IsNotEmpty({ message: 'sub_department cannot be an empty value' })
    readonly sub_department: SubDepartmentTypes;
}
