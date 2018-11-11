import { EntityType } from '../dto';

import { appRoutes } from '../../config/app-routes';
import { AppRoute } from '../models/app-route';

interface NavigationDashboard {
    title: string;
    route: AppRoute;
    entityType: EntityType;
}

// this array can grow over time
export const navigationDashboards: NavigationDashboard[] = [
    { title: 'STUDENTS', route: appRoutes.students, entityType: EntityType.Students },
    { title: 'TEACHERS', route: appRoutes.teachers, entityType: EntityType.Teachers },
    // { title: 'SUBJECTS', route: 'subjects', entityType: EntityType.Subjects },
    // { title: 'GROUPS', route: 'groups', entityType: EntityType.Groups },
    // { title: 'ADMIN', route: 'admin', entityType: EntityType.Admin },
    { title: 'LOGIN', route: appRoutes.login, entityType: EntityType.Login },
];

export interface HeaderState {
    activeDashboard: EntityType;
}
