import {Component, ContentChild, EventEmitter, Input, OnDestroy, OnInit, Output, ViewContainerRef} from '@angular/core';
import {FriendGrouping} from '../../../../models/friend-grouping.model';
import {select, Store} from '@ngrx/store';
import {UserFriend} from '../../../../models/user-friend.model';
import {Observable, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {getAllUserFriends} from '../../../../reducers';
import {CreateGroupFriendRowComponent} from '../friend-row/create-group-friend-row.component';

@Component({
    selector: 'app-create-group-friend-grouping-row',
    templateUrl: 'create-group-friend-grouping-row.component.html',
    styleUrls: ['create-group-friend-grouping-row.component.scss']
})

export class CreateGroupFriendGroupingRowComponent implements OnInit, OnDestroy {

    @Input()
    friendGrouping: FriendGrouping;

    @Output()
    add = new EventEmitter();

    userFriendsSub: Subscription;

    isOpen: boolean;

    userFriends: UserFriend[];

    constructor(private store$: Store<any>,
                private vcRef: ViewContainerRef) {
    }

    ngOnInit() {
        this.userFriendsSub = this.store$.pipe(
            select(getAllUserFriends),
            map(ufs => ufs
                .filter(uf => uf.friendGroupingId === this.friendGrouping.id))
        ).subscribe(userFriends => this.userFriends = userFriends);
    }
    ngOnDestroy(): void {
        this.userFriendsSub.unsubscribe();
    }
    openOrClose() {
        this.isOpen = !this.isOpen;
    }
    onAdd(event: MouseEvent) {
        event.stopPropagation();
        this.add.emit();
    }
}
