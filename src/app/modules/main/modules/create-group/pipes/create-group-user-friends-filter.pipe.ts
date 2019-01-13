import {Pipe, PipeTransform} from '@angular/core';
import {getUserEntities} from '../../../reducers';
import {select, Store} from '@ngrx/store';
import {User} from '../../../../../models/user.model';
import {UserFriend} from '../../../models/user-friend.model';
import {Dictionary} from '@ngrx/entity/src/models';

@Pipe({
    name: 'userFriendsFilter'
})

export class CreateGroupUserFriendsFilterPipe implements PipeTransform {

    userDictionary: Dictionary<User>;

    constructor(private store$: Store<any>) {
        this.store$.pipe(
            select(getUserEntities)
        ).subscribe(userDictionary => this.userDictionary = userDictionary);
    }

    transform(value: UserFriend[], searchKey: string) {
        if (!value) {
            return [];
        }
        return value.filter(userFriend => this.userDictionary[userFriend.friendId].name.includes(searchKey));
    }
}
