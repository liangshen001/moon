import {Component, OnInit} from '@angular/core';
import {LookupService} from '../../lookup.service';
import {tap} from 'rxjs/operators';
import {User} from '../../../../../../models/user.model';
import {MatDialog} from '@angular/material';
import {AddFriendComponent} from '../../../../components/add-friend/add-friend.component';
import {select, Store} from '@ngrx/store';
import {getUserConfig} from '../../../../reducers';
import {Observable} from 'rxjs';
import {UserConfig} from '../../../../models/user-config';

@Component({
    selector: 'app-lookup-user',
    templateUrl: './lookup-user.component.html',
    styleUrls: ['./lookup-user.component.scss']
})
export class LookupUserComponent implements OnInit {

    key: string;
    users: User[];
    userConfig$: Observable<UserConfig>;

    constructor(public dialog: MatDialog,
                private store$: Store<any>,
                private lookupService: LookupService) { }

    ngOnInit() {
        //
        // this.user2 = this.localStorageService.getItem('user');
        this.userConfig$ = this.store$.pipe(select(getUserConfig));

        this.lookupService.findUserPage().subscribe(users => this.users = users);
    }

    addFriend(userId: number) {
      this.dialog.open(AddFriendComponent, {
        width: '600px',
        data: {userId}
      });
    }

}
