import {Pipe, PipeTransform} from '@angular/core';
import {UserFriend} from '../../../models/user-friend.model';

@Pipe({
    name: 'friendGroupOnlineProportion'
})
export class FriendGroupOnlineProportionPipe implements PipeTransform {
    transform(value: UserFriend[]): any {
        // const onlineCount = value.filter(friend => friend.onlineStatus !== OnlineStatus.OFFLINE).length;
        // const count = value.length;
        // return `${onlineCount}/${count}`;
        return '';
    }

}
