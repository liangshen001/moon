import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {map, switchMap, take, tap} from 'rxjs/operators';
import {
    FriendMessageActionTypes,
    LoadFriendMessages,
    LoadFriendMessagesSuccess,
    ResendFriendMessage,
    SendFriendMessage,
    SendFriendMessageFailure,
    SendFriendMessageSuccess,
    TempAddFriendMessage
} from '../actions/friend-message.actions';
import {AppState} from '../../../reducers/app.reducer';
import {getUser} from '../../../reducers';
import {getAllFriendMessages, getFriendMessageEntities} from '../reducers';
import {FriendMessageService} from '../services/friend-message.service';
import {NgxElectronDataService} from '@ngx-electron/data';

@Injectable()
export class FriendMessageEffects {
    @Effect({dispatch: false})
    loadFriendMessages$: Observable<any> = this.actions$.pipe(
        ofType<LoadFriendMessages>(FriendMessageActionTypes.LoadFriendMessages),
        map(action => action.payload),
        switchMap(friendId =>
            this.store$.pipe(
                select(getAllFriendMessages),
                take(1),
                // 过滤掉 发送中的消息和发送失败的消息
                map(friendMessages => friendMessages.filter(fm => !fm.sending && !fm.sendError)),
                // 获取有效消息的总数
                map(friendMessages => friendMessages.length),
                switchMap(offset => this.friendMessageService.loadFriendMessages(friendId, offset))
            )
        ),
        map(friendMessages => this.electronStoreService.dispatch(
            new LoadFriendMessagesSuccess(friendMessages)))
    );

    @Effect({dispatch: false})
    sendFriendMessage$ = this.actions$.pipe(
        ofType<SendFriendMessage>(FriendMessageActionTypes.SendFriendMessage),
        map(action => action.payload),

        switchMap(({friendId, content}) => this.store$.pipe(
            select(getUser),
            take(1),
            map(user => {
                const id = new Date().valueOf();
                this.electronStoreService.dispatch(new TempAddFriendMessage({
                    id, content,
                    receiverId: friendId,
                    senderId: user.id,
                    sendTime: id,
                    sending: true
                }));
                return id;
            }),
            switchMap(id => this.friendMessageService.sendFriendMessage(friendId, content).pipe(
                tap(friendMessage => this.electronStoreService.dispatch(new SendFriendMessageSuccess({
                    id,
                    newId: friendMessage.id,
                    sendTime: friendMessage.sendTime
                })), () => this.electronStoreService.dispatch(new SendFriendMessageFailure(id)))
            ))
        ))
    );
    @Effect({dispatch: false})
    resendFriendMessage$ = this.actions$.pipe(
        ofType<ResendFriendMessage>(FriendMessageActionTypes.ResendFriendMessage),
        map(action => action.payload),
        switchMap(friendMessageId => this.store$.pipe(
            select(getFriendMessageEntities),
            take(1),
            map(entities => entities[friendMessageId]),
            switchMap(({receiverId, content}) => this.friendMessageService.sendFriendMessage(receiverId, content)),
            tap(friendMessage =>
                    this.electronStoreService.dispatch(new SendFriendMessageSuccess({
                        id: friendMessageId,
                        newId: friendMessage.id,
                        sendTime: friendMessage.sendTime
                    })),
                () => this.electronStoreService.dispatch(new SendFriendMessageFailure(friendMessageId))
            )
        ))
    );

    constructor(
        private actions$: Actions,
        private friendMessageService: FriendMessageService,
        private store$: Store<AppState>,
        private electronStoreService: NgxElectronDataService
    ) {}
}
