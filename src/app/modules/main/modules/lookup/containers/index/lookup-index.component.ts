import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {getUserConfig} from '../../../../reducers';
import {UserConfig} from '../../../../models/user-config';

@Component({
  selector: 'app-lookup-index',
  templateUrl: './lookup-index.component.html',
  styleUrls: ['./lookup-index.component.scss']
})
export class LookupIndexComponent implements OnInit {

    userConfig$: Observable<UserConfig>;

    constructor(private store$: Store<any>) { }

    ngOnInit() {
        this.userConfig$ = this.store$.pipe(select(getUserConfig));
    }
}
