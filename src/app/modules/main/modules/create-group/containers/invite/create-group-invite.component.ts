import {Component, OnInit} from '@angular/core';
import {User} from '../../../../../../models/user.model';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs/internal/Observable';
import {FriendGrouping} from '../../../../models/friend-grouping.model';
import {map, take, tap} from 'rxjs/operators';
import {getAllFriendGroupings, getAllUserFriends, getAllUsers, getTotalUserFriends} from '../../../../reducers';
import {FriendGroupingType} from '../../../../models/friend-grouping-type.enum';
import {UserFriend} from '../../../../models/user-friend.model';
import {getUser} from '../../../../../../reducers';
import {CreateGroupService} from '../../services/create-group.service';
import {AddGroup} from '../../../../actions/group.actions';
import {ActivatedRoute} from '@angular/router';
import {AddUserGroups} from '../../../../actions/user-group.action';

@Component({
    selector: 'app-create-group-invite',
    templateUrl: 'create-group-invite.component.html',
    styleUrls: ['create-group-invite.component.scss']
})

export class CreateGroupInviteComponent implements OnInit {

    invitees: User[] = [];

    searchKey: string;

    friendGroupings$: Observable<FriendGrouping[]>;

    userFriends$: Observable<UserFriend[]>;

    total$: Observable<number>;

    user$: Observable<User>;

    groupId: number;

    constructor(private store$: Store<any>,
                private activatedRoute: ActivatedRoute,
                private createGroupService: CreateGroupService) {
    }

    ngOnInit() {
        // 好友分组信息
        this.friendGroupings$ = this.store$.pipe(
            select(getAllFriendGroupings),
            map(friendGroups => friendGroups.filter(({type}) =>
                    type !== FriendGroupingType.BLANK_LIST &&
                    type !== FriendGroupingType.STRANGER))
        );
        this.total$ = this.store$.pipe(
            select(getTotalUserFriends)
        );
        this.user$ = this.store$.pipe(
            select(getUser)
        );
        this.userFriends$ = this.store$.pipe(
            select(getAllUserFriends)
        );
        this.activatedRoute.params.subscribe(data => {
            if (data.groupId) {
                this.groupId = +data.groupId;
            }
        });
    }

    /**
     * 添加邀请
     * @param {User} user
     */
    addInvitee(user: User) {
        this.store$.pipe(
            select(getUser),
            take(1)
        ).subscribe(createUser => {
            // 不添加自己
            if (createUser.id !== user.id) {
                const currentInviterIds = this.invitees.map(invitee => invitee.id);
                if (!currentInviterIds.includes(user.id)) {
                    this.invitees.push(user);
                }
            }
        });
    }

    /**
     * 去除群好友
     * @param inviteeId
     */
    deleteInvitee(inviteeId) {
        const index = this.invitees.findIndex(invitee => invitee.id !== inviteeId);
        this.invitees.splice(index, 1);
    }

    /**
     * 添加一个分组所有好友
     * @param {UserFriend[]} userFriends
     */
    addFriendGroupingAllFriends(userFriends: UserFriend[]) {
        const currentInviteeIds = this.invitees.map(invitee => invitee.id);
        const friendIds = userFriends.map(userFriend => userFriend.friendId)
            .filter(friendId => !currentInviteeIds.includes(friendId));
        this.store$.pipe(
            select(getAllUsers),
            take(1),
            map(users => users.filter(user => friendIds.includes(user.id)))
        ).subscribe(users => this.invitees.push(...users));
    }

    /**
     * 上一步
     */
    previous() {
        history.back();
    }

    /**
     * 添加好友用户关系
     */
    confirm() {
        this.store$.dispatch(new AddUserGroups({
            inviteeIds: this.invitees.map(invitee => invitee.id),
            groupId: this.groupId
        }));
    }

    /**
     * 添加群组
     */
    create() {
        this.store$.dispatch(new AddGroup({
            ...this.createGroupService.formValue,
            inviteeIds: this.invitees.map(invitee => invitee.id)
        }));
    }
}
