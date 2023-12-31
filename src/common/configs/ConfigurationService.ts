import { join } from 'node:path';
import { config as configDotenv } from 'dotenv';
import { Environment } from '../../app/constants/Environment';
import { validateEnv } from '../../app/validateEnv';
import { LoggerService } from '../services/LoggerService';
import { GenericObject } from './GenericObject';
import { ConfigurationType } from './ConfigurationType';

export class ConfigurationService {
    private static readonly instance: ConfigurationService;
    private readonly logger: LoggerService;
    private readonly variables: ConfigurationType;
    private readonly configs: GenericObject;

    constructor() {
        if (ConfigurationService.instance) {
            return ConfigurationService.instance;
        }
        this.variables = this.loadEnvConfig();
        this.logger = new LoggerService(ConfigurationService.name);
        this.configs = {
            NODE_ENV: this.variables.NODE_ENV,
            SERVER_PORT: this.variables.SERVER_PORT,
            SERVER_URL: this.variables.SERVER_URL,
            JWT_ACCESS_TOKEN_SECRET: this.variables.JWT_ACCESS_TOKEN_SECRET,
            JWT_ACCESS_TOKEN_EXPIRATION_TIME:
                this.variables.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
        };
        this.logger.log('Initialized');
    }

    private loadEnvConfig(): ConfigurationType {
        const envFile = configDotenv({
            path: join(__dirname, '..', '..', '..', '.env'),
        });

        if (envFile.error) {
            throw envFile.error;
        }
        const {
            parsed: {
                NODE_ENV,
                SERVER_PORT,
                SERVER_URL,
                JWT_ACCESS_TOKEN_SECRET,
                JWT_ACCESS_TOKEN_EXPIRATION_TIME,
            },
        } = envFile;

        const variables = {
            NODE_ENV: NODE_ENV as Environment,
            SERVER_PORT,
            SERVER_URL,
            JWT_ACCESS_TOKEN_SECRET,
            JWT_ACCESS_TOKEN_EXPIRATION_TIME,
        };

        validateEnv(variables);
        return variables;
    }

    get(key: string): string {
        return this.configs.hasOwnProperty(key) ? this.configs[key] : null;
    }
}

export const configurationService = new ConfigurationService();
