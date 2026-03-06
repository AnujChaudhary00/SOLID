export class NoSuchProfession extends Error {
    constructor(personType: string) {
        super(personType);
    }
}
