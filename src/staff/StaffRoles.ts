import { FinancialService } from '../thirdparty/FinancialService';
import { StudioEmployee } from '../thirdparty/StudioEmployee';

export interface Payer {
    pay(person: StudioEmployee, financialService: FinancialService): void;
}

export interface Performer {
    act(): boolean;
    shoot(): boolean;
}
