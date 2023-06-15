import { IncomingMessage } from 'node:http';
import { JwtPayload } from 'jsonwebtoken';
import { jwtService } from '../services/JWTService';

export const verifyAccessToken = async (
    req: IncomingMessage,
): Promise<JwtPayload> => {
    const authorization = req?.headers?.authorization;
    if (authorization) {
        const [bearer, token] = authorization?.split(' ');
        if (bearer !== 'Bearer' || !token) {
            return;
        } else {
            return jwtService.verifyAccessJWT(token);
        }
    }
};
