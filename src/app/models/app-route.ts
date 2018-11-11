import { UserRole } from './user';

export interface AppRoute {
    path: string;
    permissions?: UserRole[];
}
