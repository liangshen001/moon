import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {map} from 'rxjs/operators';
import {combineLatest} from 'rxjs/internal/observable/combineLatest';
import {Observable} from 'rxjs';
import {ChatMessage} from '../../../../models/chat-message.model';
import {State} from '../../reducers';
import {getUser} from '../../../../../../reducers';
import {User} from '../../../../../../models/user.model';
import {getUserEntities} from '../../../../reducers';

@Component({
    selector: 'app-chat-room-message',
    templateUrl: 'chat-room-message.component.html',
    styleUrls: ['chat-room-message.component.scss']
})
export class ChatRoomMessageComponent implements OnInit {
    @Input()
    message: ChatMessage;

    @Output()
    resend = new EventEmitter<number>();
    sender$: Observable<MessageSender>;
    showResendIcon: boolean;

    constructor(private store$: Store<State>) {}

    ngOnInit(): void {
        this.sender$ = combineLatest(
            this.store$.pipe(select(getUser)),
            this.store$.pipe(select(getUserEntities))
        ).pipe(
            map(([user, entities]) =>
                user.id === this.message.senderId ? {
                    ...user, self: true
                } : {
                    ...entities[this.message.senderId], self: false
                })
        );
    }

    resendMessage() {
        this.resend.emit(this.message.id);
    }
}

interface MessageSender extends User {
    self: boolean;
}
