import { createHash } from 'node:crypto';

export class HashService {
    async passwordHash(plainPassword: string): Promise<string> {
        const hash = createHash('sha256');
        hash.update(plainPassword);
        return hash.digest('hex');
    }

    async checkIsMatch(
        plainPassword: string,
        hashedPassword: string,
    ): Promise<boolean> {
        const hashedValue = await this.passwordHash(plainPassword);
        return hashedValue === hashedPassword;
    }
}
