import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {UserConfig} from '../../../../models/user-config';
import {select, Store} from '@ngrx/store';
import {getUserConfig} from '../../../../reducers';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

    userConfig$: Observable<UserConfig>;

    constructor(private store$: Store<any>,
                private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.userConfig$ = this.store$.pipe(
            select(getUserConfig)
        );
    }


    activated(path: string) {
        return this.activatedRoute.firstChild.routeConfig.path === path;
    }
}
