import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {getUserConfig, isSkinsInit} from '../../../../reducers';
import {ActivatedRoute, Router} from '@angular/router';
import {UserConfig} from '../../../../models/user-config';
import {filter, take} from 'rxjs/operators';
import {LoadSkins} from '../../../../actions/skin.actions';

@Component({
    selector: 'app-appearance-setting-index',
    templateUrl: 'appearance-setting-index.component.html',
    styleUrls: ['appearance-setting-index.component.scss']
})

export class AppearanceSettingIndexComponent implements OnInit {

    userConfig$: Observable<UserConfig>;

    constructor(private store$: Store<any>,
                private router: Router,
                private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.userConfig$ = this.store$.pipe(
            select(getUserConfig)
        );
        this.store$.pipe(
            select(isSkinsInit),
            take(1),
            filter(init => !init)
        ).subscribe(() => this.store$.dispatch(new LoadSkins()));
    }

    activated(path: string) {
        return this.activatedRoute.firstChild.routeConfig.path === path;
    }
}
