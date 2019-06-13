import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {LoadUserFriends} from '../../actions/user-friend.actions';
import {LoadGroups} from '../../actions/group.actions';
import {LoadFriendGroupings} from '../../actions/friend-grouping.action';
import {LoadConversations} from '../../actions/conversation.actions';
import {LoadUsers} from '../../actions/user.action';
import {NgxElectronService} from '@ngx-electron/core';
import {getUser} from '../../../../reducers';

@Component({
    selector: 'app-main-index',
    template: `
            <router-outlet></router-outlet>
`
})
export class MainIndexComponent implements OnInit {

    constructor(private electronService: NgxElectronService,
                private store$: Store<any>) {}
    ngOnInit(): void {
        if (!this.electronService.isElectron()) {
            // 初始化好友列表
            this.store$.dispatch(new LoadUsers());
            // 初始化好友分组列表
            this.store$.dispatch(new LoadFriendGroupings());
            // 初始化好友关系列表
            this.store$.dispatch(new LoadUserFriends());
            // 初始化群组列表
            this.store$.dispatch(new LoadGroups());
            // 初始化会话列表
            this.store$.dispatch(new LoadConversations());
        }
        // this.windowService.userSuccessObserver();
    }

}
