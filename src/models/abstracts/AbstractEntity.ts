export abstract class AbstractEntity {
    readonly id: number = 9;
    readonly created_at: Date;

    constructor() {
        this.id++;
        this.created_at = new Date();
    }
}
