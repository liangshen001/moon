import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {
    AddFriendGrouping,
    FriendGroupingChangeSort,
    FriendGroupingDragStart,
    FriendGroupingOpenOrClose,
    RenameFriendGrouping
} from '../../../../actions/friend-grouping.action';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {FriendGrouping} from '../../../../models/friend-grouping.model';
import {UserFriend} from '../../../../models/user-friend.model';
import {FriendChangeFriendGrouping} from '../../../../actions/user-friend.actions';
import {ContextMenuItemsService} from '../../../../services/context-menu-items.service';
import {Subscription} from 'rxjs';
import {
    getAllUserFriends,
    getFriendGroupingDragging,
    getUserConfig,
    getUserEntities,
    getUserFriendDragging,
    State
} from '../../../../reducers';

// import {DeleteGroupingConfirmIndexComponent} from '../app-delete-grouping-confirm/app-delete-grouping-confirm-index.component';

@Component({
    selector: 'app-home-friend-grouping-row',
    templateUrl: 'home-friend-grouping-row.component.html',
    styleUrls: ['home-friend-grouping-row.component.scss']
})
export class HomeFriendGroupingRowComponent implements OnInit, OnDestroy {

    @Input()
    friendGrouping: FriendGrouping;

    groupingNameInputEle: HTMLInputElement;

    onlineRate: string;

    menuItems: any[];

    userFriends: UserFriend[];

    dragging$: Observable<boolean>;

    friendGroupingDragging$: Observable<boolean>;

    private _friendGroupingConfigSub: Subscription;

    private _userFriendsSub: Subscription;
    private _userEntitiesSub: Subscription;

    constructor(private store$: Store<State>,
                private contextMenuItemsService: ContextMenuItemsService) {}

    ngOnInit(): void {

        this.dragging$ = this.store$.pipe(select(getUserFriendDragging));
        this.friendGroupingDragging$ = this.store$.pipe(select(getFriendGroupingDragging));

        this._friendGroupingConfigSub = this.store$.pipe(
            select(getUserConfig),
            filter(userConfig => !!userConfig)
        ).subscribe(userConfig => {
                this.menuItems = this.contextMenuItemsService
                    .getFriendGroupingRowContextMenuItems(userConfig, this.friendGrouping, this.groupingNameInputEle);

                this._userFriendsSub = this.store$.pipe(
                    select(getAllUserFriends),
                    map(ufs => ufs
                        .filter(uf => uf.friendGroupingId === this.friendGrouping.id))
                ).subscribe(userFriends =>
                    this._userEntitiesSub = this.store$.pipe(
                        select(getUserEntities),
                        //
                        filter(userEntities => userFriends.every(uf => !!userEntities[uf.friendId])),
                        map(userEntities => userFriends.filter(uf =>
                                userEntities[uf.friendId].onlineStatus))
                    ).subscribe(onlineUserFriends => {
                        this.onlineRate = `${onlineUserFriends.length}/${userFriends.length}`;
                        this.userFriends = userConfig.showOnlineFriend ?
                            onlineUserFriends : userFriends;

                    })
                );
            });
    }

    /**
     * 打开或关闭好友组中的好友列表
     */
    openOrClose() {
        this.friendGrouping.renaming || this.friendGrouping.adding ||
        this.store$.dispatch(new FriendGroupingOpenOrClose(this.friendGrouping.id));
    }

    /**
     * 修改好友所在的好友组
     * @param {DragEvent} event
     */
    changeFriendGroup(event: DragEvent) {
        const id = +event.dataTransfer.getData('userFriendId');
        this.store$.dispatch(new FriendChangeFriendGrouping({id, friendGroupingId: this.friendGrouping.id}));
    }

    closeRenameFriendGroupInput(name: string) {
        this.friendGrouping.renaming && this.store$.dispatch(new RenameFriendGrouping({id: this.friendGrouping.id, name}));
        this.friendGrouping.adding && this.store$.dispatch(new AddFriendGrouping({id: this.friendGrouping.id, name}));
    }

    ngOnDestroy(): void {
        this._friendGroupingConfigSub && this._friendGroupingConfigSub.unsubscribe();
        this._userFriendsSub && this._userFriendsSub.unsubscribe();
        this._userEntitiesSub && this._userEntitiesSub.unsubscribe();
    }

    friendGroupingDragStart() {
        this.store$.dispatch(new FriendGroupingDragStart(this.friendGrouping.id));
    }

    groupingChangeSort(param: {
        id: number,
        changeSort: number
    }) {
        this.store$.dispatch(new FriendGroupingChangeSort(param));
    }

      getGroupingNameInput(groupingNameInput: HTMLInputElement) {

      }
}
