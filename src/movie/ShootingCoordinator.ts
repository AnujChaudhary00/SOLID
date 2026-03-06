import { IStaffInformation } from '../staff/IStaffInformation';
import { IShootingCoordinator } from './interfaces/IDelegates';
import { StudioEmployee } from '../thirdparty/StudioEmployee';
import { Performer } from '../staff/StaffRoles';

export class ShootingCoordinator implements IShootingCoordinator {
    attemptShoot(staffingService: IStaffInformation): boolean {
        // Use the dedicated getPerformers() method instead of filtering
        // This is cleaner and shows explicit dependency on performer information only
        const performers = staffingService.getPerformers();
        return performers.every((person: StudioEmployee & Performer) =>
            person.act() && person.shoot()
        );
    }
}
