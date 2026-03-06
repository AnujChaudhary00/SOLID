export class InsufficientBudgetException extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'InsufficientBudgetException';
    }
}
