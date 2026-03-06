import { StudioEmployee } from '../thirdparty/StudioEmployee';
import { FinancialService } from '../thirdparty/FinancialService';
import { Payer } from '../staff/StaffRoles';

// Type guard to check if an employee implements the Payer interface
function isPayer(person: StudioEmployee): person is StudioEmployee & Payer {
    const maybe = person as unknown as Partial<Payer>;
    return typeof maybe.pay === 'function';
}

export class PaymentOrchestrator {
    paySalary(employees: StudioEmployee[], financialService: FinancialService): void {
        // find any employee capable of paying (Payer capability)
        const payer = employees.find(isPayer);
        if (payer) {
            for (const person of employees) {
                payer.pay(person, financialService);
            }
        }
    }
}
