import {Component, Input, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {GroupSystemMessage} from '../../../../models/group-system-message';
import {select, Store} from '@ngrx/store';
import {getGroupEntities, getUserEntities} from '../../../../reducers';
import {map, switchMap, take} from 'rxjs/operators';
import {User} from '../../../../../../models/user.model';
import {Group} from '../../../../models/group.model';

@Component({
    selector: 'app-validation-message-group-system-message',
    templateUrl: 'validation-message-group-system-message.component.html',
    styleUrls: ['validation-message-group-system-message.component.scss']
})

export class ValidationMessageGroupSystemMessageComponent implements OnInit {

    @Input()
    groupSystemMessage: GroupSystemMessage;

    user: User;

    isSender: boolean;

    group: Group;

    private _sub: Subscription;


    constructor(private store$: Store<any>) {
    }

    ngOnInit() {
        this._sub = this.store$.pipe(
            select(getUserEntities),
            map(entities => [entities[this.groupSystemMessage.inviterId], entities[this.groupSystemMessage.userId]]),
            switchMap(([inviter, user]) => this.store$.pipe(
                select(getGroupEntities),
                take(1),
                map(entites => [inviter, user, entites[this.groupSystemMessage.groupId]])
            ))
        ).subscribe(([inviter, user, group]) => {
            this.group = <Group> group;
            if (inviter) {
                this.user = <User> inviter;
                this.isSender = false;
            } else {
                this.user = <User> user;
                this.isSender = true;
            }
        });
    }


    close(/*id: number*/) {

    }

    ignore(/*id: number*/) {

    }

    agree(/*id: number*/) {

    }
    reject(/*id: number*/) {

    }
}