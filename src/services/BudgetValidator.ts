import { InsufficientBudgetException } from "../thirdparty/InsufficientBudgetException";
import { BudgetValidationContext } from "./BudgetValidationContext";

/**
 * Single-argument validate() reduces the fat-method ISP violation.
 * New validation rules can be added via composition (CompositeBudgetValidator)
 * without modifying existing validators (OCP).
 */
export interface BudgetValidator {
    validate(context: BudgetValidationContext): void;
}

export class DefaultBudgetValidator implements BudgetValidator {
    validate(context: BudgetValidationContext): void {
        if (!context.producingService.canBeProduced(
            context.financialService.getBudget(),
            context.daysInProduction,
            context.staffingService,
            context.movieStaff
        )) {
            throw new InsufficientBudgetException('Movie cannot be produced - budget is insufficient');
        }
    }
}

/**
 * Composite validator: runs multiple validators in sequence.
 * Allows new validation rules to be added without modifying existing ones (OCP).
 */
export class CompositeBudgetValidator implements BudgetValidator {
    constructor(private readonly validators: BudgetValidator[]) {}

    validate(context: BudgetValidationContext): void {
        for (const validator of this.validators) {
            validator.validate(context);
        }
    }
}
