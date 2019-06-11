import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {UserConfig} from '../../../../models/user-config';
import {select, Store} from '@ngrx/store';
import {getUserConfig} from '../../../../reducers';
import {ActivatedRoute, Router} from '@angular/router';
import {searchKeys} from '../../models/search-keys';
import {map} from 'rxjs/operators';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

    userConfig$: Observable<UserConfig>;

    path: string;

    searchKey: string;

    options = searchKeys;

    routerKey = {
        'permission-settings': '',
        'security-settings': '',
        'basic-settings': ''
    };

    constructor(private store$: Store<any>,
                private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.activatedRoute.queryParams.pipe(
            map(params => params.key)
        ).subscribe(key => {
            this.routerKey[this.activatedRoute.snapshot.children[0].routeConfig.path] = key;
            console.log(this.routerKey);
        });

        this.path = this.activatedRoute.snapshot.children[0].routeConfig.path;
        this.userConfig$ = this.store$.pipe(
            select(getUserConfig)
        );
    }

}
