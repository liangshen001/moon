import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getAllFriendMessages, getUserEntities, State} from '../../../../reducers';
import {Observable} from 'rxjs';
import {filter, map, tap} from 'rxjs/operators';
import {FriendMessage} from '../../../../models/friend-message.model';
import {LoadFriendMessages, ResendFriendMessage, SendFriendMessage} from '../../../../actions/friend-message.actions';
import {User} from '../../../../../../models/user.model';
import {FriendLoadInfo} from '../../../../actions/user.action';
import {NgxElectronDataService} from '@ngx-electron/data';

@Component({
    selector: 'app-chat-room-private',
    templateUrl: 'chat-room-private.component.html',
    styleUrls: ['chat-room-private.component.scss']
})
export class ChatRoomPrivateComponent implements OnInit {
    // 聊天消息记录Observable
    messages$: Observable<FriendMessage[]>;
    // 好友
    friend$: Observable<User>;
    // 好友id
    friendId: number;

    constructor(private route: ActivatedRoute,
                private store$: Store<State>,
                private electronStoreService: NgxElectronDataService) {}

    ngOnInit(): void {
        this.friendId = +this.route.snapshot.params.friendId;
        // 好友消息
        this.messages$ = this.store$.pipe(
            select(getAllFriendMessages),
            map(friendMessages => friendMessages.filter(fm =>
                fm.receiverId === this.friendId || fm.senderId == this.friendId))
        );
        // 当前用户
        this.friend$ = this.store$.pipe(
            select(getUserEntities),
            map(entities => entities[this.friendId]),
            filter(friend => !!friend),
            // 是否加载好友信息(聊天记录)
            tap(friend => friend.loadInfo ||
                this.electronStoreService.dispatch(new FriendLoadInfo(this.friendId)) ||
                this.store$.dispatch(new LoadFriendMessages(this.friendId))
            )
        );
    }

    /**
     * 发送消息
     * @param {string} content
     */
    sendMessage(content: string) {
        this.store$.dispatch(new SendFriendMessage({friendId: this.friendId, content}));
    }

    /**
     * 重新发送消息
     * @param {number} friendMessageId
     */
    resendMessage(friendMessageId: number) {
        this.store$.dispatch(new ResendFriendMessage(friendMessageId));
    }

}
