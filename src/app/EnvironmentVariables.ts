import 'reflect-metadata';
import {
    IsEnum,
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsString,
    Max,
    Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Environment } from './constants/Environment';

export class EnvironmentVariables {
    @IsEnum(Environment, { message: 'NODE_ENV must be an enum value' })
    @IsNotEmpty({ message: 'NODE_ENV cannot be an empty value' })
    readonly NODE_ENV: Environment;

    @IsString({ message: 'SERVER_URL must be a string value' })
    @IsOptional({ message: 'SERVER_URL an optional value' })
    readonly SERVER_URL: string;

    @Min(0, { message: 'SERVER_PORT cannot be less than zero' })
    @Max(65535, { message: 'SERVER_PORT cannot be more than 65535' })
    @IsInt({ message: 'SERVER_PORT must be an integer value' })
    @Type(() => Number)
    @IsOptional({ message: 'SERVER_PORT an optional value' })
    readonly SERVER_PORT: number;

    @IsString({ message: 'JWT_ACCESS_TOKEN_SECRET must be a string value' })
    @IsNotEmpty({ message: 'JWT_ACCESS_TOKEN_SECRET cannot be an empty value' })
    readonly JWT_ACCESS_TOKEN_SECRET: string;

    @IsString({
        message: 'JWT_ACCESS_TOKEN_EXPIRATION_TIME must be a string value',
    })
    @IsNotEmpty({
        message: 'JWT_ACCESS_TOKEN_EXPIRATION_TIME cannot be an empty value',
    })
    readonly JWT_ACCESS_TOKEN_EXPIRATION_TIME: string;
}
