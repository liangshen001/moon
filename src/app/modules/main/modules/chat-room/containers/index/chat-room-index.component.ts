import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {getUserConfig} from '../../../../reducers';
import {UserConfig} from '../../../../models/user-config';

@Component({
    selector: 'app-chat-room-index',
    templateUrl: 'chat-room-index.component.html',
    styleUrls: ['chat-room-index.component.scss']
})

export class ChatRoomIndexComponent implements OnInit {

    userConfig$: Observable<UserConfig>;

    constructor(private store$: Store<any>) {
    }

    ngOnInit() {
        this.userConfig$ = this.store$.pipe(select(getUserConfig));
    }
}