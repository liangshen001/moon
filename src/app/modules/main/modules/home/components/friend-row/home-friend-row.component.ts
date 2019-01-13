import {Component, HostListener, Input, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {UserFriend} from '../../../../models/user-friend.model';
import {ContextMenuItemsService} from '../../../../services/context-menu-items.service';
import {OnlineStatus} from '../../../../../../enums/online-status';
import {map} from 'rxjs/operators';
import {User} from '../../../../../../models/user.model';
import {UserFriendDragStart} from '../../../../actions/user-friend.actions';
import {AppState} from '../../../../../../reducers/app.reducer';
import {getAllFriendGroupings, getUserConfig, getUserEntities} from '../../../../reducers';
import {UserConfig} from '../../../../models/user-config';
import {Subscription} from 'rxjs';
import {ChatType} from '../../../../enums/chat-type';
import {ElectronWindowService} from '../../../../../../services/electron-window.service';

@Component({
    selector: 'app-home-private-chat-row',
    templateUrl: './home-friend-row.component.html',
    styleUrls: ['./home-friend-row.component.scss']
})
export class HomeFriendRowComponent implements OnInit, OnDestroy {

    offline = OnlineStatus.OFFLINE;

    @Input()
    userFriend: UserFriend;

    user: User;
    userConfig: UserConfig;

    menuItems: any[];

    dragging = false;

    private _userConfigSub: Subscription;
    private _userSub: Subscription;
    private _friendGroupingsSub: Subscription;

    constructor(private homeMenuService: ContextMenuItemsService,
                private store$: Store<AppState>,
                private electronWindowService: ElectronWindowService) {}

    ngOnInit(): void {
        this._userSub = this.store$.pipe(
            select(getUserEntities),
            map(entities => entities[this.userFriend.friendId])
        ).subscribe(user => this.user = user);
        this._userConfigSub = this.store$.pipe(select(getUserConfig)).subscribe(
            userConfig => this.userConfig = userConfig);
        this._friendGroupingsSub = this.store$.pipe(
            select(getAllFriendGroupings),
            map(friendGroupings => friendGroupings.filter(
                friendGrouping => friendGrouping.id !== this.userFriend.friendGroupingId))
        ).subscribe(friendGroupings => this.menuItems =
            this.homeMenuService.getFriendRowContextMenuItems(this.userFriend, friendGroupings));
    }

    @HostListener('dblclick')
    openFriendChatWindow() {
        this.electronWindowService.openChatRoom(ChatType.FRIEND, this.userFriend.friendId);
    }

    @HostListener('dragstart', ['$event'])
    friendDragStart(event) {
        event.dataTransfer.setData('userFriendId', this.userFriend.id);
        this.store$.dispatch(new UserFriendDragStart());
        this.dragging = true;
        // this.store$.dispatch(new FriendGroupingOpenOrClose(this.friend.friendGroupingId));
        // this.store$.dispatch(new FriendGroupingOpenOrClose(this.friend.friendGroupingId));
    }

    ngOnDestroy(): void {
        this._userConfigSub.unsubscribe();
        this._userSub.unsubscribe();
        this._friendGroupingsSub.unsubscribe();
    }
}
