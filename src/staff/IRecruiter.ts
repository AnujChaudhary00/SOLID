import { StudioEmployee } from '../thirdparty/StudioEmployee';


export interface IRecruiter {
    /**
     * Hire a new staff member of the specified type.
     * @param name The name of the person to hire
     * @param personType The type of role (e.g., 'actor', 'cameraman')
     * @returns The hired StudioEmployee, or null if not found
     * @throws NoSuchProfession if the personType is not recognized
     */
    hire(name: string, personType: string): StudioEmployee | null;
}
