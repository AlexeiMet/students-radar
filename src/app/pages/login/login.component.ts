import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormGroupDirective, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { LoginResponse } from '../../dto/login-response.model';
import { appRoutes } from '../../../config/app-routes';
import { localStorageConfig } from '../../../config/local-storage';
import {
    NOT_LOGGED_IN_STATUS_TEXT,
    LOGGED_IN_STATUS_TEXT,
    NOT_LOGGED_IN_LOGIN_BTN_TEXT,
    LOGGED_IN_LOGIN_BTN_TEXT,
} from './login-component.config';

@Component({
    selector: 'sr-login-page',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.scss'],
})
export class LoginPageComponent implements OnInit, OnDestroy {
    public user: User;

    public loginError: any;

    public statusText = NOT_LOGGED_IN_STATUS_TEXT;

    public loginBtnText = NOT_LOGGED_IN_LOGIN_BTN_TEXT;

    public loginForm: FormGroup;

    public waitingForLoginResponse = false;

    @ViewChild(FormGroupDirective)
    private loginFormDirective: FormGroupDirective;

    private subscriptions = new Subscription();

    constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) {}

    public ngOnInit() {
        this.selectUser();
        this.selectLoginError();
        this.initLoginForm();
    }

    public ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }

    public onSubmit() {
        if (this.loginForm.valid) {
            this.subscriptions.add(
                this.authService
                    .login(this.loginForm.value.login, this.loginForm.value.password)
                    .subscribe(user => this.onLoginSuccess(user), error => this.onLoginError(error)),
            );
            this.onLoginAwait();
        }
    }

    private setStatusText() {
        this.statusText =
            this.user && this.user.name
                ? LOGGED_IN_STATUS_TEXT.replace('{{username}}', this.user.name)
                : NOT_LOGGED_IN_STATUS_TEXT;
    }

    private setLoginBtnText() {
        this.loginBtnText = this.user ? LOGGED_IN_LOGIN_BTN_TEXT : NOT_LOGGED_IN_LOGIN_BTN_TEXT;
    }

    private initLoginForm() {
        this.loginForm = new FormGroup({
            login: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required),
        });
    }

    private selectUser() {
        this.subscriptions.add(
            this.authService.user.subscribe(user => {
                this.user = user;
                this.setStatusText();
                this.setLoginBtnText();
            }),
        );
    }

    private selectLoginError() {
        this.subscriptions.add(
            this.authService.loginError.subscribe(error => {
                this.loginError = error;
            }),
        );
    }

    private onLoginAwait() {
        this.waitingForLoginResponse = true;
        this.loginFormDirective.resetForm();
    }

    private onLoginSuccess(response: LoginResponse) {
        this.authService.user.next(response.user);
        localStorage[localStorageConfig.jwt] = response.jwt;
        this.waitingForLoginResponse = false;
        this.redirectAfterLogin();
    }

    private onLoginError(error) {
        this.authService.loginError.next(error);
        this.waitingForLoginResponse = false;
        alert(`Error while login: ${error}`);
    }

    private redirectAfterLogin() {
        this.router.navigate(['/students']);
    }
}
