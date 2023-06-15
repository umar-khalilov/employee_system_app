import { hashPassword, validatePassword } from 'metautil';

export class HashService {
    async passwordHash(plainPassword: string): Promise<string> {
        return hashPassword(plainPassword);
    }

    async checkIsMatch(
        plainValue: string,
        hashedValue: string,
    ): Promise<boolean> {
        return validatePassword(plainValue, hashedValue);
    }
}
