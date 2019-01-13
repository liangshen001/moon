import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../../../../../models/user.model';
import {ContextMenuItemsService} from '../../../../services/context-menu-items.service';
import {select, Store} from '@ngrx/store';
import {filter, map, switchMap, take} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {getUser} from '../../../../../../reducers';
import {UserGroup} from '../../../../models/user-group.model';
import {getUserEntities, getAllUserFriends} from '../../../../reducers';

@Component({
    selector: 'app-chat-room-group-member-row',
    templateUrl: 'chat-room-group-member-row.component.html',
    styleUrls: ['chat-room-group-member-row.component.scss']
})
export class ChatRoomGroupMemberRowComponent implements OnInit, OnDestroy {
    @Input()
    userGroup: UserGroup;

    user: User;

    menuItems = [];

    private _sub: Subscription;

    constructor(private contextMenuItemsService: ContextMenuItemsService,
                private store$: Store<any>) {}

    ngOnInit(): void {
        this._sub = this.store$.pipe(
            select(getUserEntities),
            map(entities => entities[this.userGroup.memberId]),
            switchMap(member => this.store$.pipe(
                select(getAllUserFriends),
                switchMap(userFriends => this.store$.pipe(
                    select(getUser),
                    filter(user => !!user),
                    take(1),
                    map(user => {
                        return {
                            user,
                            userFriends,
                            member
                        };
                    })
                ))
            ))
        ).subscribe(({user, userFriends, member}) => {
            if (user.id === this.userGroup.memberId) {
                this.menuItems = [];
                this.user = user;
            } else {
                const userFriend = userFriends.find(uf => uf.friendId === member.id);
                this.menuItems = this.contextMenuItemsService
                    .getGroupMemberRowContextMenuItems(user, userFriend);
                this.user =  member;
            }
        });


    }

    ngOnDestroy(): void {
        this._sub.unsubscribe();
    }



}
