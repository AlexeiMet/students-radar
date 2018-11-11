import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './services/auth.service';
import { homeRoute, appRoutes } from '../config/app-routes';

@Component({
    selector: 'sr-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    public jwtChecked = false;

    constructor(private router: Router, private authService: AuthService) {}

    public ngOnInit() {
        this.checkJwt();
        this.selectJwtChecked();
    }

    private checkJwt() {
        this.authService
            .checkJwt()
            .subscribe(user => this.handleCheckJwtSuccess(user), error => this.handleCheckJwtError(error));
    }

    private selectJwtChecked() {
        this.authService.jwtChecked.subscribe(jc => (this.jwtChecked = jc));
    }

    private handleCheckJwtSuccess(user) {
        this.authService.user.next(user);
        this.authService.jwtChecked.next(true);
    }

    private handleCheckJwtError(error) {
        this.authService.jwtChecked.next(true);
    }
}
