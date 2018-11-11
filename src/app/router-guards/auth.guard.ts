import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { filter, take } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';
import { User } from '../models/user';
import { appRoutes } from '../../config/app-routes';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    private user: User;

    constructor(private router: Router, private authService: AuthService) {
        this.selectUser();
    }

    public canActivate(route): Promise<boolean> {
        return new Promise((res, rej) => {
            this.authService.jwtChecked.pipe(filter(jc => jc === true)).subscribe(jc => {
                if (!this.user) {
                    this.router.navigate([appRoutes.login.path]);
                    res(false);
                } else {
                    if (!route.data.permissions || (this.user && route.data.permissions.includes(this.user.role))) {
                        res(true);
                    } else {
                        this.router.navigate([appRoutes.notFound.path]);
                        res(false);
                    }
                }
            });
        });
    }

    private selectUser() {
        this.authService.user.subscribe(user => (this.user = user));
    }
}
