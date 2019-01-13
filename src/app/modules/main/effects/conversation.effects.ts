import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {map, switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs/internal/Observable';
import {
    ConversationActionTypes,
    LoadConversations,
    LoadConversationsSuccess,
    RemoveConversation,
    UpdateConversation
} from '../actions/conversation.actions';
import {MainState} from '../reducers';
import {ConversationService} from '../services/conversation.service';


@Injectable()
export class ConversationEffects {

    @Effect()
    loadConversations$: Observable<Action> = this.actions$.pipe(
        ofType<LoadConversations>(ConversationActionTypes.LoadConversations),
        switchMap(() => this.conversationService.loadConversations()),
        map(conversations => new LoadConversationsSuccess(conversations))
    );

    @Effect({dispatch: false})
    updateConversation$: Observable<any> = this.actions$.pipe(
        ofType<UpdateConversation>(ConversationActionTypes.UpdateConversation),
        map(action => action.payload),
        switchMap(({id, changes}) => this.conversationService.updateConversation(id, changes))
    );

    @Effect({dispatch: false})
    removeConversation$: Observable<any> = this.actions$.pipe(
        ofType<RemoveConversation>(ConversationActionTypes.RemoveConversation),
        map<RemoveConversation, number>(action => action.payload),
        switchMap(id => this.conversationService.removeConversation(id))
    );


    constructor(
        private store$: Store<MainState>,
        private actions$: Actions,
        private conversationService: ConversationService
    ) {}
}
