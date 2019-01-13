import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {getUserConfig} from '../../../../reducers';
import {ActivatedRoute} from '@angular/router';
import {UserConfig} from '../../../../models/user-config';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-create-group-index',
    templateUrl: 'create-group-index.component.html',
    styleUrls: ['create-group-index.component.scss']
})

export class CreateGroupIndexComponent implements OnInit {

    groupId: number;
    userConfig$: Observable<UserConfig>;

    constructor(private store$: Store<any>,
                private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.userConfig$ = this.store$.pipe(
            select(getUserConfig)
        );
        this.activatedRoute.params.subscribe(data => {
            if (data.groupId !== null) {
                this.groupId = +data.groupId;
            }
        });
    }

    activated(path: string) {
        return this.activatedRoute.firstChild.routeConfig.path === path;
    }
}
