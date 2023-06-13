import { format } from 'node:util';
import { GenericObject } from '../configs/GenericObject';

export class LoggerService {
    private readonly name: string;
    private readonly DATETIME_LENGTH: number;
    private readonly COLOURS: GenericObject;

    constructor(name = LoggerService.name) {
        this.name = name;
        this.DATETIME_LENGTH = 19;
        this.COLOURS = {
            info: '\x1b[32m',
            debug: '\x1b[1;33m',
            error: '\x1b[0;31m',
            system: '\x1b[1;34m',
            access: '\x1b[1;38m',
        };
    }

    private output(type = 'info', msg: string): void {
        const now = new Date().toISOString();
        const date = now.substring(0, this.DATETIME_LENGTH);
        const colour = this.COLOURS[type];
        const line = `${date}\t[${this.name}] ${msg}`;
        if (type === 'error') {
            console.error(`${colour}${line}\x1b[0m`);
        }
        if (type === 'debug') {
            console.debug(`${colour}${line}\x1b[0m`);
        } else {
            console.log(`${colour}${line}\x1b[0m`);
        }
    }

    public log(...args: unknown[]): void {
        const msg = format(...args);
        this.output('info', msg);
    }

    public debug(...args: unknown[]): void {
        const msg = format(...args);
        this.output('debug', msg);
    }

    public error(...args: unknown[]): void {
        const msg = format(...args).replace(/[\n\r]{2,}/g, '\n');
        this.output('error', msg);
    }

    public system(...args: unknown[]): void {
        const msg = format(...args);
        this.output('system', msg);
    }

    public access(...args: unknown[]): void {
        const msg = format(...args);
        this.output('access', msg);
    }
}
