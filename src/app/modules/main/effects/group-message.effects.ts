import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {map, switchMap, take, tap} from 'rxjs/operators';
import {AppState} from '../../../reducers/app.reducer';
import {
    GroupMessageActionTypes,
    LoadGroupMessages,
    LoadGroupMessagesSuccess,
    ResendGroupMessage,
    SendGroupMessage,
    SendGroupMessageFailure,
    SendGroupMessageSuccess,
    TempAddGroupMessage
} from '../actions/group-message.actions';
import {getUser} from '../../../reducers';
import {GroupMessageService} from '../services/group-message.service';
import {getGroupMessageEntities, getTotalGroupMessages} from '../reducers';
import {NgxElectronDataService} from '@ngx-electron/data';

@Injectable()
export class GroupMessageEffects {

    @Effect({dispatch: false})
    loadGroupMessages$: Observable<any> = this.actions$.pipe(
        ofType<LoadGroupMessages>(GroupMessageActionTypes.LoadGroupMessages),
        map(action => action.payload),
        switchMap(groupId => this.store$.pipe(
            select(getTotalGroupMessages),
            take(1),
            switchMap(offset => this.groupMessageService.loadGroupMessages(groupId, offset))
        )),
        map(groupMessages => this.electronStoreService.dispatch(new LoadGroupMessagesSuccess(groupMessages)))
    );

    @Effect({dispatch: false})
    sendGroupMessage$: Observable<any> = this.actions$.pipe(
        ofType<SendGroupMessage>(GroupMessageActionTypes.SendGroupMessage),
        map(action => action.payload),
        switchMap(({groupId, content}) => this.store$.pipe(
            select(getUser),
            take(1),
            map(user => {
                const id = new Date().valueOf();
                this.electronStoreService.dispatch(new TempAddGroupMessage({
                    id, content, groupId,
                    senderId: user.id,
                    sendTime: id,
                    sending: true,
                    senderName: user.name
                }));
                return id;
            }),
            switchMap(id => this.groupMessageService.sendGroupMessage(groupId, content).pipe(
                tap(groupMessage => this.store$.dispatch(new SendGroupMessageSuccess({
                    id,
                    newId: groupMessage.id,
                    sendTime: groupMessage.sendTime
                })), () => this.electronStoreService.dispatch(new SendGroupMessageFailure(id)))
            ))
        ))
    );

    @Effect({dispatch: false})
    resendGroupMessage$ = this.actions$.pipe(
        ofType<ResendGroupMessage>(GroupMessageActionTypes.ResendGroupMessage),
        map(action => action.payload),
        switchMap(groupMessageId => this.store$.pipe(
            select(getGroupMessageEntities),
            take(1),
            map(entities => entities[groupMessageId]),
            switchMap(({groupId, content}) => this.groupMessageService.sendGroupMessage(groupId, content)),
            tap(groupMessage => this.electronStoreService.dispatch(new SendGroupMessageSuccess({
                id: groupMessageId,
                newId: groupMessage.id,
                sendTime: groupMessage.sendTime
            })), () => this.electronStoreService.dispatch(new SendGroupMessageFailure(groupMessageId)))
        ))
    );

    constructor(
        private actions$: Actions,
        private groupMessageService: GroupMessageService,
        private store$: Store<AppState>,
        private electronStoreService: NgxElectronDataService
    ) {}
}
