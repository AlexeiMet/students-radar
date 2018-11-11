export enum UserRole {
    admin,
    student,
    teacher,
}

export interface User {
    id: string;
    name: string;
    role: UserRole;
}
