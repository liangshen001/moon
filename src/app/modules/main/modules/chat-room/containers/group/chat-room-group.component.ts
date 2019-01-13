import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {filter, map, tap} from 'rxjs/operators';
import {getAllGroupMessages, getAllUserGroups, getGroupEntities, State} from '../../../../reducers';
import {Group} from '../../../../models/group.model';
import {GroupMessage} from '../../../../models/group-message.model';
import {LoadGroupMessages, ResendGroupMessage, SendGroupMessage} from '../../../../actions/group-message.actions';
import {GroupLoadInfo} from '../../../../actions/group.actions';
import {LoadUserGroups} from '../../../../actions/user-group.action';
import {UserGroup} from '../../../../models/user-group.model';
import {LoadUsers} from '../../../../actions/user.action';
import {NgxElectronDataService} from '@ngx-electron/data';

@Component({
    selector: 'app-chat-room-group',
    templateUrl: 'chat-room-group.component.html',
    styleUrls: ['chat-room-group.component.scss']
})
export class ChatRoomGroupComponent implements OnInit {
    // 群组Observable
    group$: Observable<Group>;
    // 群组成员Observable
    userGroups$: Observable<UserGroup[]>;
    // 群组聊天记录Observable
    messages$: Observable<GroupMessage[]>;
    // 群组id
    groupId: number;

    constructor(private route: ActivatedRoute,
                private store$: Store<State>,
                private electronStoreService: NgxElectronDataService) {}

    ngOnInit(): void {
        this.groupId = +this.route.snapshot.params.groupId;
        // 查询群组
        this.group$ = this.store$.pipe(
            select(getGroupEntities),
            map(entities => entities[this.groupId]),
            filter(group => !!group),
            // 是否加载群组详情信息（聊天记录，群组成员）
            tap(group => group.loadInfo ||
                this.electronStoreService.dispatch(new GroupLoadInfo(group.id)) ||
                this.store$.dispatch(new LoadGroupMessages(group.id)) ||
                this.store$.dispatch(new LoadUserGroups(group.id)) ||
                this.store$.dispatch(new LoadUsers(group.id))
            )
        );
        // 群组聊天记录
        this.messages$ = this.store$.pipe(
            select(getAllGroupMessages),
            map(groupMessages => groupMessages.filter(
                groupMessage => groupMessage.groupId === this.groupId)),
        );
        // 群级成员
        this.userGroups$ = this.store$.pipe(
            select(getAllUserGroups),
            map(userGroups => userGroups.filter(g => g.groupId === this.groupId))
        );
    }

    /**
     * 发送消息
     * @param {string} content
     */
    sendMessage(content: string) {
        this.store$.dispatch(new SendGroupMessage({
            groupId: this.groupId,
            content
        }));
    }

    /**
     * 重新发送消息
     * @param {number} groupMessageId 重新发送消息的id
     */
    resendMessage(groupMessageId: number) {
        this.store$.dispatch(new ResendGroupMessage(groupMessageId));
    }
}
