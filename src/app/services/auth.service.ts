import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { User, UserRole } from '../models/user';
import { ApiRoutes } from '../../config/api-routes';
import { LoginResponse } from '../dto/login-response.model';
import { mockUsers } from '../mock-data/users';
import { localStorageConfig } from '../../config/local-storage';

const mockUser = {
    id: '123123',
    name: 'Stanislau Karmanau',
    role: UserRole.admin,
};

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    public user: BehaviorSubject<User> = new BehaviorSubject(null);

    public loginError: BehaviorSubject<Error> = new BehaviorSubject(null);

    public checkJwtError: BehaviorSubject<Error> = new BehaviorSubject(null);

    public jwtChecked: BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor(private http: HttpClient) {}

    public login(login: string, password: string): Observable<LoginResponse> {
        return this.mockLoginRequest(login, password);
    }

    public checkJwt(): Observable<User | Error> {
        return Observable.create(observer => {
            const jwt = localStorage[localStorageConfig.jwt];
            if (jwt) {
                // this.checkJwtRequest(jwt).subscribe( // TODO: Uncomment when api would be awailable
                this.mockCheckJwtRequest(jwt).subscribe(user => observer.next(user), error => observer.next(error));
            } else {
                observer.error(Error('No jwt found!'));
            }
        });
    }

    private loginRequest(login: string, password: string): Observable<any> {
        return this.http.post(ApiRoutes.login, { login, password });
    }

    private checkJwtRequest(jwt: string): Observable<any> {
        return this.http.post(ApiRoutes.checkJwt, { jwt });
    }

    private mockLoginRequest(login, password): Observable<any> {
        return Observable.create(observer => {
            // Simulate request waiting
            setTimeout(() => {
                if (mockUsers[login] && mockUsers[login].password === password) {
                    observer.next({ user: mockUsers[login].user, jwt: mockUsers[login].jwt });
                } else {
                    observer.error('Incorrect credentials');
                }
                observer.complete();
            }, 2000);
        });
    }

    private mockCheckJwtRequest(jwt: string): Observable<any> {
        return Observable.create(observer => {
            setTimeout(() => {
                let matchingUser: string;
                for (const user in mockUsers) {
                    if (mockUsers[user].jwt === jwt) {
                        matchingUser = mockUsers[user].user;
                        break;
                    }
                }
                if (matchingUser) {
                    observer.next(matchingUser);
                } else {
                    observer.error(Error('Incorrect jwt provided!'));
                }
                observer.complete();
            }, 2000);
        });
    }
}
