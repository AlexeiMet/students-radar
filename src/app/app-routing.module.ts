import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './pages/page-not-found';
import { appRoutes, homeRoute } from '../config/app-routes';

const routes: Routes = [
    { path: '', redirectTo: homeRoute.path, pathMatch: 'full' },
    { path: appRoutes.notFound.path, component: PageNotFoundComponent },
    { path: '**', redirectTo: appRoutes.notFound.path, pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
