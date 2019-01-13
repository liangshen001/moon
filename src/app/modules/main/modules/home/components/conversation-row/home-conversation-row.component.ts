import {Component, HostListener, Input, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {UpdateConversation} from '../../../../actions/conversation.actions';
import {Conversation} from '../../../../models/conversation';
import {ContextMenuItemsService} from '../../../../services/context-menu-items.service';
import {ChatType} from '../../../../enums/chat-type';
import {OnlineStatus} from '../../../../../../enums/online-status';
import {GroupStatus} from '../../../../enums/group-status';
import {getAllUserFriends, getAllUserGroups, getGroupEntities, getUserEntities, State} from '../../../../reducers';
import {filter, map} from 'rxjs/operators';
import {combineLatest} from 'rxjs/internal/observable/combineLatest';
import {UserFriend} from '../../../../models/user-friend.model';
import {User} from '../../../../../../models/user.model';
import {UserGroup} from '../../../../models/user-group.model';
import {Group} from '../../../../models/group.model';
import {ElectronWindowService} from '../../../../../../services/electron-window.service';

@Component({
    selector: 'app-home-conversation-row',
    templateUrl: './home-conversation-row.component.html',
    styleUrls: ['./home-conversation-row.component.scss']
})
export class HomeConversationRowComponent implements OnInit, OnDestroy {

    menuItems: any[];
    sub: Subscription;
    isOffline = false;
    name: string;
    imageUrl: string;
    /**
     * 是否忽略消息（提示未读消息是否为红色的，否则为蓝色的）
     */
    isIndifference: boolean;
    /**
     * 是否隐藏未读数
     * @type {boolean}
     */
    isHiddenUnreadCount = false;
    chatId: number;

    @Input()
    conversation: Conversation;

    constructor(private homeContextMenuItemsService: ContextMenuItemsService,
                private store$: Store<State>,
                private electronWindowService: ElectronWindowService) {}

    ngOnInit(): void {
        if (this.conversation.chatType === ChatType.FRIEND) {
            this.sub = combineLatest(
                this.store$.pipe(
                    select(getAllUserFriends),
                    map(userFriends => userFriends.find(userFriend => userFriend.friendId === this.conversation.chatId)),
                    filter(userFriend => !!userFriend)
                ),
                this.store$.pipe(select(getUserEntities))
            ).pipe(
                filter(([userFriend, userEntities]) => !!userEntities[userFriend.friendId]),
                map(([userFriend, userEntities]) => [userFriend, userEntities[userFriend.friendId]])
            ).subscribe(([userFriend, user]: [UserFriend, User]) => {
                this.menuItems = this.homeContextMenuItemsService
                    .getFriendConversationRowContextMenuItems(userFriend, this.conversation);
                this.chatId = userFriend.friendId;
                this.isIndifference = userFriend.shield;
                this.name = user.name;
                this.imageUrl = user.imageUrl;
                this.isOffline = user.onlineStatus === OnlineStatus.OFFLINE;
            });
        } else if (this.conversation.chatType === ChatType.GROUP) {
            this.sub = combineLatest(
                this.store$.pipe(
                    select(getAllUserGroups),
                    map(userGroups => userGroups.find(userGroup => userGroup.groupId === this.conversation.chatId)),
                    filter(userGroup => !!userGroup)
                ),
                this.store$.pipe(select(getGroupEntities))
            ).pipe(
                filter(([userGroup, groupEntities]) => !!groupEntities[userGroup.groupId]),
                map(([userGroup, groupEntities]) => [userGroup, groupEntities[userGroup.groupId]])
            ).subscribe(([userGroup, group]: [UserGroup, Group]) => {
                this.menuItems = this.homeContextMenuItemsService
                    .getGroupConversationRowContextMenuItems(userGroup, this.conversation);
                this.name = group.name;
                this.imageUrl = group.imageUrl;
                this.isIndifference = userGroup.groupStatus !== GroupStatus.NORMAL;
                this.chatId = group.id;
            });
        } else {
            this.name = '验证消息';
            this.imageUrl = '';
            this.isHiddenUnreadCount = true;
            this.menuItems = this.homeContextMenuItemsService
                .getValidationMessageRowContextMenuItems(this.conversation);
        }
    }

    ngOnDestroy(): void {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

    clearUnreadCount() {
        this.store$.dispatch(new UpdateConversation({
            id: this.conversation.id,
            changes: {
                unreadCount: 0
            }
        }));
    }

    @HostListener('dblclick')
    openChat() {
        this.electronWindowService.openChatRoom(this.conversation.chatType, this.chatId);
    }

}
