import { UserRole } from '../../models/user';

const mockAdmin = {
    id: 1,
    name: 'Mock Admin',
    role: UserRole.admin,
};

const mockStudent = {
    id: 2,
    name: 'Mock Student',
    role: UserRole.student,
};

const mockTeacher = {
    id: 2,
    name: 'Mock Teacher',
    role: UserRole.teacher,
};

export const mockUsers = {
    ADMIN: {
        password: 'ADMIN',
        user: mockAdmin,
        jwt: 'ADMIN',
    },
    STUDENT: {
        password: 'STUDENT',
        user: mockStudent,
        jwt: 'STUDENT',
    },
    TEACHER: {
        password: 'TEACHER',
        user: mockTeacher,
        jwt: 'TEACHER',
    },
};
