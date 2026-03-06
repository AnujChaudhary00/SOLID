import { StudioEmployee } from '../thirdparty/StudioEmployee';

type RoleConstructor = (name: string) => StudioEmployee;

class RoleFactoryClass {
    private registry: { [key: string]: RoleConstructor } = {};

    register(role: string, ctor: RoleConstructor) {
        this.registry[role.toLowerCase()] = ctor;
    }

    create(role: string, name: string): StudioEmployee | null {
        const ctor = this.registry[role.toLowerCase()];
        if (!ctor) {
            return null;
        }
        return ctor(name);
    }
}

export const RoleFactory = new RoleFactoryClass();

export default RoleFactory;
