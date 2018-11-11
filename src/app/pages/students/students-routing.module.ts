import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentCardComponent } from './components/student-card';
import { StudentsPageComponent } from './students.component';
import { AuthGuard } from '../../router-guards/auth.guard';
import { appRoutes } from '../../../config/app-routes';
import { UserRole } from '../../models/user';

const routes: Routes = [
    {
        path: appRoutes.students.path,
        component: StudentsPageComponent,
        // children: [{ path: 'card', component: StudentCardComponent }],
        data: {
            permissions: appRoutes.students.permissions,
        },
        canActivate: [AuthGuard],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class StudentsPageRoutingModule {}
