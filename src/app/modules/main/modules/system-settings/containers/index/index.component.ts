import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {UserConfig} from '../../../../models/user-config';
import {select, Store} from '@ngrx/store';
import {getUserConfig} from '../../../../reducers';
import {ActivatedRoute, Router} from '@angular/router';
import {MatButtonToggleGroup} from '@angular/material';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

    userConfig$: Observable<UserConfig>;

    url: string;

    constructor(private store$: Store<any>,
                private router: Router) {
    }

    ngOnInit() {
        this.url = this.router.url;
        this.userConfig$ = this.store$.pipe(
            select(getUserConfig)
        );
    }

}
