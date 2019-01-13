import {Component, OnInit} from '@angular/core';
import {StompRService} from '@stomp/ng2-stompjs';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs/internal/Observable';
import {ChatType} from '../../../../enums/chat-type';
import {FriendGrouping} from '../../../../models/friend-grouping.model';
import {Conversation} from '../../../../models/conversation';
import {
    getAllConversations,
    getAllFriendGroupings,
    getAllGroupGroupings,
    getUserConfig
} from '../../../../reducers';
import {ContextMenuItemsService} from '../../../../services/context-menu-items.service';
import {filter, map, switchMap} from 'rxjs/operators';
import {FriendGroupingType} from '../../../../models/friend-grouping-type.enum';
import {GroupGrouping} from '../../../../models/group-grouping.model';
import {UserConfig} from '../../../../models/user-config';

@Component({
    selector: 'app-home-chat-list',
    templateUrl: './home-chat-list.component.html',
    styleUrls: ['./home-chat-list.component.scss']
})
export class HomeChatListComponent implements OnInit {

    isOpen: boolean;
    privateChatType = ChatType.FRIEND;
    groupChatType = ChatType.GROUP;

    friendGroupings$: Observable<FriendGrouping[]>;
    conversations$: Observable<Conversation[]>;

    groupGrouping$: Observable<GroupGrouping[]>;

    friendGroupingMenuItems: any[];
    groupGroupingMenuItems: any[];

    constructor(private stompService: StompRService,
                // private localStorageService: LocalStorageService,
                private store$: Store<any>,
                private contextMenuItemsService: ContextMenuItemsService) {
    }

    ngOnInit() {
        this.store$.pipe(
            select(getUserConfig),
            filter(config => !!config)
        ).subscribe(config => {
            this.friendGroupingMenuItems = this.contextMenuItemsService.getFriendGroupingPenalContextMenuItems(config);
            this.groupGroupingMenuItems = this.contextMenuItemsService.getGroupGroupingPenalContextMenuItems(config);
        });
        // 好友分组信息
        this.friendGroupings$ = this.store$.pipe(
            select(getAllFriendGroupings),
            switchMap(friendGroups => this.store$.pipe(
                select(getUserConfig),
                filter(userConfig => !!userConfig),
                map(userConfig =>
                    friendGroups.filter(friendGroup => this.filterFriendGroup(friendGroup, userConfig)))
            ))
        );
        // 群组信息
        this.groupGrouping$ = this.store$.pipe(select(getAllGroupGroupings));
        // 获得当前会话
        this.conversations$ = this.store$.pipe(select(getAllConversations));

    }
    filterFriendGroup(friendGroup: FriendGrouping, userConfig: UserConfig) {
        switch (friendGroup.type) {
            case FriendGroupingType.BLANK_LIST:
                return userConfig.showBlackList;
            // case FriendGroupingType.OFFICIAL_ACCOUNTS:
            //     return friendGroupConfig.showOfficialAccounts;
            case FriendGroupingType.STRANGER:
                return userConfig.showStranger;
            default:
                return true;
        }
    }
}


