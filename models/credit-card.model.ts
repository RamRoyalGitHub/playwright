export class CreditCardModel {
    readonly cardNumber: string;
    readonly cvv: string;
    readonly name: string;
    readonly expirayMonth: string;

    constructor(configured: Partial<CreditCardModel>) {

        this.cardNumber = configured.cardNumber ?? "4444 0000 2222 5555";
        this.cvv = configured.cvv ?? "154";
        this.name = configured.name ?? "Venkat";
        this.expirayMonth = configured.expirayMonth ?? "12";
    }
}