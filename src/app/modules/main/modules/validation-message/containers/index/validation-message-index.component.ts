import {Component, OnInit} from '@angular/core';
import {ValidationMessageType} from '../../../../enums/validation-message-type';
import {map, take} from 'rxjs/operators';
import {getUser} from '../../../../../../reducers';
import {LoadUsersSuccess} from '../../../../actions/user.action';
import {LoginSuccess} from '../../../../../../actions/app.actions';
import {LoadUserFriendsSuccess} from '../../../../actions/user-friend.actions';
import {select, Store} from '@ngrx/store';
import {LoadFriendValidationSuccess} from '../../../../actions/friend-validation.actions';
import {LoadGroupSystemMessagesSuccess} from '../../../../actions/group-system-message.actions';
import {getAllFriendValidations, getAllGroupSystemMessages, getAllUserFriends, getAllUsers} from '../../../../reducers';
import {Observable} from 'rxjs';
import {FriendValidation} from '../../../../models/friend-validation';
import {GroupSystemMessage} from '../../../../models/group-system-message';
import {NgxElectronDataService} from '@ngx-electron/data';
import {NgxElectronService} from '@ngx-electron/core';

@Component({
    selector: 'app-validation-message-index',
    templateUrl: 'validation-message-index.component.html',
    styleUrls: ['validation-message-index.component.scss']
})

export class ValidationMessageIndexComponent implements OnInit {

    type: ValidationMessageType;

    friendValidations$: Observable<FriendValidation[]>;

    groupSystemMessages$: Observable<GroupSystemMessage[]>;

    constructor(private electronService: NgxElectronService,
                private electronStoreService: NgxElectronDataService,
                private store$: Store<any>) {
    }

    ngOnInit() {
        this.type = ValidationMessageType.FRIEND_VALIDATION;
        this.friendValidations$ = this.store$.pipe(
            select(getAllFriendValidations)
        );
        this.groupSystemMessages$ = this.store$.pipe(
            select(getAllGroupSystemMessages)
        );
    }


    isFriendValidation() {
        return ValidationMessageType.FRIEND_VALIDATION === this.type;
    }

    isGroupSystemMessage() {
        return ValidationMessageType.GROUP_SYSTEM_MESSAGE === this.type;
    }

    showFriendValidation() {
        this.type = ValidationMessageType.FRIEND_VALIDATION;
    }

    showGroupSystemMessage() {
        this.type = ValidationMessageType.GROUP_SYSTEM_MESSAGE;
    }
}
