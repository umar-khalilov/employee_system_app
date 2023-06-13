import { Environment } from '@/app/constants/Environment';

export type ConfigurationObject = {
    readonly NODE_ENV: Environment;
    readonly SERVER_PORT: string;
    readonly SERVER_URL: string;
    readonly JWT_ACCESS_TOKEN_SECRET: string;
    readonly JWT_ACCESS_TOKEN_EXPIRATION_TIME: string;
};
