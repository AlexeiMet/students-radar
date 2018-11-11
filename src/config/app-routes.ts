import { UserRole } from '../app/models/user';
import { AppRoute } from '../app/models/app-route';

export const appRoutes: { [name: string]: AppRoute } = {
    students: {
        path: 'students',
        permissions: [UserRole.admin, UserRole.student, UserRole.teacher],
    },
    login: {
        path: 'login',
    },
    notFound: {
        path: 'not-found',
    },
    teachers: {
        path: 'teachers',
        permissions: [UserRole.admin, UserRole.teacher],
    },
};

export const homeRoute = appRoutes.students;

export const afterLoginRedirects = {
    [UserRole.admin]: homeRoute.path,
    [UserRole.student]: homeRoute.path,
    [UserRole.teacher]: homeRoute.path,
};
