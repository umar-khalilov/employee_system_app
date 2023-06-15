import {
    JsonWebTokenError,
    JwtPayload,
    NotBeforeError,
    TokenExpiredError,
    sign,
    verify,
} from 'jsonwebtoken';
import {
    ConfigurationService,
    configurationService,
} from '../configs/ConfigurationService';
import { TokenException } from '../exceptions/TokenException';
import { TokenExpiredException } from '../exceptions/TokenExpiredException';
import { TokenMalformedException } from '../exceptions/TokenMalformedException';
import { TokenNotBeforeException } from '../exceptions/TokenNotBeforeException';
import { TokenPayload } from '../types/GeneralTypes';

export class JWTService {
    private readonly config: ConfigurationService;
    private readonly accessJwtSecret: string;
    private readonly accessJwtOptions: object;

    constructor() {
        this.config = configurationService;
        this.accessJwtSecret = this.config.get('JWT_ACCESS_TOKEN_SECRET');
        this.accessJwtOptions = {
            algorithm: 'HS384',
            expiresIn: this.config.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME'),
        };
    }

    async generateAccessJWT(payload: TokenPayload): Promise<string> {
        return new Promise((resolve, reject) => {
            sign(
                payload,
                this.accessJwtSecret,
                this.accessJwtOptions,
                (err, token: string) => {
                    if (err) {
                        reject(new TokenException());
                    }
                    resolve(token);
                },
            );
        });
    }

    async verifyAccessJWT(token: string): Promise<JwtPayload> {
        return new Promise((resolve, reject) => {
            verify(
                token,
                this.accessJwtSecret,
                this.accessJwtOptions,
                (err: JsonWebTokenError, decodedData: JwtPayload) => {
                    if (err?.name === TokenExpiredError.name) {
                        reject(new TokenExpiredException(err['expiredAt']));
                    }
                    if (err?.name === JsonWebTokenError.name) {
                        reject(new TokenMalformedException());
                    }
                    if (err?.name === NotBeforeError.name) {
                        reject(new TokenNotBeforeException(err['date']));
                    }
                    resolve(decodedData);
                },
            );
        });
    }
}

export const jwtService = new JWTService();
