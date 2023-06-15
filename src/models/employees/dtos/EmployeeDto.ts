import {
    IsBoolean,
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    Length,
    Matches,
} from 'class-validator';
import { CurrencyTypes } from '@/common/enums/CurrencyTypes';
import { DepartmentTypes } from '@/common/enums/DepartmentTypes';
import { SubDepartmentTypes } from '@/common/enums/SubDepartmentTypes';

export class EmployeeDto {
    @Length(3, 300, {
        message: 'name cannot be less 3 and more than 300 characters',
    })
    @IsString({ message: 'name must me a string value' })
    @IsNotEmpty({ message: 'name cannot be an empty value' })
    readonly name: string;

    @IsEmail({}, { message: 'email must be a valid email address' })
    @Length(5, 350, {
        message: 'email cannot be less 5 and more than 350 characters',
    })
    @IsString({ message: 'email must be a string value' })
    @IsNotEmpty({ message: 'email cannot be an empty value' })
    readonly email: string;

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

    @Matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,32}$/,
        {
            message:
                'password cannot be less than 8 and no more than 32 characters',
        },
    )
    @IsString({ message: 'password must be a string value' })
    @IsNotEmpty({ message: 'password cannot be an empty value' })
    readonly password: string;
}
