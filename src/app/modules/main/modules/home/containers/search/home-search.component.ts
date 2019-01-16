import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SearchModel} from '../../../../models/search.model';
import {ChatType} from '../../../../enums/chat-type';
import {filter, map, pluck, switchMap} from 'rxjs/operators';
import {combineLatest, Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {
    getAllUserFriends,
    getUserEntities,
    getFriendGroupingEntities
} from '../../../../reducers';
import {User} from '../../../../../../models/user.model';
import {UserFriend} from '../../../../models/user-friend.model';

@Component({
    selector: 'app-home-search',
    templateUrl: './home-search.component.html',
    styleUrls: ['./home-search.component.scss']
})
export class HomeSearchComponent implements OnInit {

    friendSearchs$: Observable<SearchModel[]>;
    groupSearchs: SearchModel[];
    key$: Observable<string>;

    constructor(private activatedRoute: ActivatedRoute,
                private store$: Store<any>) {
    }

    ngOnInit() {
        this.key$ = this.activatedRoute.params.pipe(
            pluck('key')
        );
        const userFriends$ = this.store$.pipe(
            select(getAllUserFriends)
        );
        const userEntities$ = this.store$.pipe(
            select(getUserEntities)
        );
        const friendGroupingEntities$ = this.store$.pipe(
            select(getFriendGroupingEntities)
        );
        this.friendSearchs$ = combineLatest(this.key$, userFriends$,
            userEntities$, friendGroupingEntities$).pipe(
                map(([key, userFriends, userEntities, friendGroupingEntities]) =>
                    userFriends.map(userFriend => ({
                        user: userEntities[userFriend.friendId],
                        friendGrouping: friendGroupingEntities[userFriend.friendGroupingId]
                    })).map(({user, friendGrouping}) => ({
                        id: user.id,
                        name: user.name,
                        imageUrl: user.imageUrl,
                        desc: friendGrouping.type,
                        type: ChatType.FRIEND,
                        key
                    })).filter(search => search.name.includes(key))
                )
            );
    }


}
