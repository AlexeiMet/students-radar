import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AppState, AppStateFields } from '../store';
import { navigationDashboards } from './header.models';
import { EntityType } from '../dto';
import { SetActiveDashboard } from './header.actions';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';

@Component({
    selector: 'sr-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
    public navDashboards;

    public activeDashboard: EntityType;

    public user: User;

    private subscriptions = new Subscription();

    constructor(private store: Store<AppState>, private authService: AuthService) {
        this.store.select(AppStateFields.Header).subscribe(state => (this.activeDashboard = state.activeDashboard));
    }

    public ngOnInit() {
        this.selectUser();
    }

    public ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }

    public onDashboardClick(clickedDashboard: EntityType) {
        this.store.dispatch(new SetActiveDashboard(clickedDashboard));
    }

    private selectUser() {
        this.authService.user.subscribe(user => {
            this.user = user;
            this.setNavDashboards();
        });
    }

    private setNavDashboards() {
        this.navDashboards = navigationDashboards.filter(nd => {
            return nd.route.permissions ? this.user && nd.route.permissions.includes(this.user.role) : true;
        });
    }
}
