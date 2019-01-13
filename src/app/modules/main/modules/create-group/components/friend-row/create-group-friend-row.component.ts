import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {User} from '../../../../../../models/user.model';
import {UserFriend} from '../../../../models/user-friend.model';
import {select, Store} from '@ngrx/store';
import {getAllUsers} from '../../../../reducers';
import {map} from 'rxjs/operators';

@Component({
    selector: 'app-create-group-friend-row',
    templateUrl: 'create-group-friend-row.component.html',
    styleUrls: ['create-group-friend-row.component.scss']
})

export class CreateGroupFriendRowComponent implements OnInit, OnDestroy {

    @Input()
    userFriend: UserFriend;

    @Input()
    friend: User;

    @Output()
    delete = new EventEmitter();

    @Input()
    showDeleteBtn: boolean;

    friendSub: Subscription;

    constructor(private store$: Store<any>) {
    }

    ngOnInit() {
        if (this.userFriend) {
            this.friendSub = this.store$.pipe(
                select(getAllUsers),
                map(users => users.find(user => user.id === this.userFriend.friendId))
            ).subscribe(friend => this.friend = friend);
        }
    }

    ngOnDestroy(): void {
        if (this.friendSub) {
            this.friendSub.unsubscribe();
        }
    }
}
