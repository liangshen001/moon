import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {ChangeOnlineStatus, LoginSuccess} from '../actions/app.actions';
import {Router} from '@angular/router';
import {ChatType} from '../modules/main/enums/chat-type';
import {NgxElectronService} from '@ngx-electron/core';
import {NgxElectronDataService} from '@ngx-electron/data';
import {OnlineStatus} from '../enums/online-status';
import {LoadUserConfigSuccess, UpdateUserConfig} from '../modules/main/actions/user-config.actions';
import {
    getAllConversations,
    getAllFriendGroupings,
    getAllFriendMessages,
    getAllFriendValidations,
    getAllGroupMessages,
    getAllGroups,
    getAllGroupSystemMessages,
    getAllUserFriends,
    getAllUsers,
    getUserConfig
} from '../modules/main/reducers';
import {filter, map, take} from 'rxjs/operators';
import {getUser} from '../reducers';
import {of} from 'rxjs';
import {LoadUserFriendsSuccess} from '../modules/main/actions/user-friend.actions';
import {LoadUsers, LoadUsersSuccess} from '../modules/main/actions/user.action';
import {LoadFriendGroupingsSuccess} from '../modules/main/actions/friend-grouping.action';
import {LoadFriendMessagesSuccess} from '../modules/main/actions/friend-message.actions';
import {LoadGroupsSuccess} from '../modules/main/actions/group.actions';
import {LoadGroupMessagesSuccess} from '../modules/main/actions/group-message.actions';
import {LoadFriendValidationSuccess} from '../modules/main/actions/friend-validation.actions';
import {LoadGroupSystemMessagesSuccess} from '../modules/main/actions/group-system-message.actions';
import {UpdateConversation} from '../modules/main/actions/conversation.actions';

@Injectable({
    providedIn: 'root'
})
export class ElectronWindowService {

    constructor(private electronService: NgxElectronService,
                private store$: Store<any>,
                private electronStoreService: NgxElectronDataService,
                private router: Router) {
    }

    switchAccount() {
        this.electronService.remote.getCurrentWindow().hide();
        const win = this.electronStoreService.openPage('auth', {
            width: 505,
            height: 480,
            alwaysOnTop: true,
            skipTaskbar: true
        }, {
            complete: () => this.electronService.remote.getCurrentWindow().destroy()
        });
        win.on('close', () => this.electronService.remote.app.quit());
    }


    openHome(routerUrl: string, loginSuccessAction) {
        // debugger;
        console.log('test');
        this.electronService.remote.getCurrentWindow().hide();
        const win = this.electronStoreService.openPage(`home/${routerUrl}`, {
            width: 298,
            height: 710,
            alwaysOnTop: true,
            skipTaskbar: true
        }, {
            actions: [of(loginSuccessAction)],
            key: 'home',
            complete: () => this.electronService.remote.getCurrentWindow().destroy()
        });
        win.on('close', () => this.electronService.remote.app.quit());
    }

    openAppearanceSetting(routerUrl: string) {
        this.electronStoreService.openPage(`appearance-setting/${routerUrl}`, {
            width: 775,
            height: 620
        }, {
            key: 'appearance-setting',
            actions: [
                this.store$.pipe(
                    select(getUserConfig),
                    filter(uc => !!uc),
                    take(1),
                    map(userConfig => new LoadUserConfigSuccess(userConfig))
                )
            ]
        });
    }

    openChatRoom(chatType: ChatType, chatId?: number) {
        const commonActions = [
            this.store$.pipe(
                select(getAllUserFriends),
                take(1),
                map(friends => new LoadUserFriendsSuccess(friends))
            ),
            this.store$.pipe(
                select(getUser),
                take(1),
                map(user => new LoginSuccess(user))
            ),
            this.store$.pipe(
                select(getAllUsers),
                take(1),
                map(users => new LoadUsersSuccess(users))
            ),
        ];
        // 窗口得到焦点，清除会话中的未读数量
        const created = w => w.on('focus', () =>
            this.store$.pipe(
                select(getAllConversations),
                take(1),
                map(conversations => conversations.find(
                    conversation => conversation.chatType === chatType && conversation.chatId === chatId)),
                filter(conversation => !!conversation && !!conversation.unreadCount),
                map(conversation => conversation.id)
            ).subscribe(id => this.store$.dispatch(new UpdateConversation({
                id,
                changes: {
                    unreadCount: 0
                }
            })))
        );

        let win;
        if (chatType === ChatType.FRIEND) {
            win = this.electronStoreService.openPage(`chat-room/friend/${chatId}`, {
                width: 620,
                height: 547
            }, {
                actions: [
                    ...commonActions,
                    this.store$.pipe(
                        select(getAllFriendGroupings),
                        take(1),
                        map(friendGroups => new LoadFriendGroupingsSuccess(friendGroups))
                    ),
                    this.store$.pipe(
                        select(getAllFriendMessages),
                        take(1),
                        map(messages => new LoadFriendMessagesSuccess(messages))
                    ),
                    this.store$.pipe(
                        select(getUserConfig),
                        take(1),
                        map(userConfig => new LoadUserConfigSuccess(userConfig))
                    )
                ],
                webHandler: () => this.router.navigate([{
                    outlets: {aux: `chat-room/friend/${chatId}`}
                }]),
                created
            });
        } else if (chatType === ChatType.GROUP) {
            win = this.electronStoreService.openPage(`chat-room/group/${chatId}`, {
                width: 840,
                height: 547
            }, {
                actions: [
                    ...commonActions,
                    this.store$.pipe(
                        select(getAllGroups),
                        take(1),
                        map(groups => new LoadGroupsSuccess(groups))
                    ),
                    this.store$.pipe(
                        select(getAllFriendGroupings),
                        take(1),
                        map(friendGroups => new LoadFriendGroupingsSuccess(friendGroups))
                    ),
                    this.store$.pipe(
                        select(getAllGroupMessages),
                        take(1),
                        map(messages => new LoadGroupMessagesSuccess(messages))
                    ),
                    this.store$.pipe(
                        select(getUserConfig),
                        take(1),
                        map(userConfig => new LoadUserConfigSuccess(userConfig))
                    )
                ],
                webHandler: () => this.router.navigate([{
                    outlets: {aux: `chat-room/group/${chatId}`}
                }]),
                created
            });
        } else if (chatType === ChatType.VILIDATION_MESSAGE) {
            win = this.electronStoreService.openPage(`validation-message`, {
                width: 620,
                height: 547
            }, {
                actions: [
                    ...commonActions,
                    this.store$.pipe(
                        select(getAllGroups),
                        take(1),
                        map(groups => new LoadGroupsSuccess(groups))
                    ),
                    this.store$.pipe(
                        select(getAllFriendValidations),
                        take(1),
                        map(friendValidations => new LoadFriendValidationSuccess(friendValidations))
                    ),
                    this.store$.pipe(
                        select(getAllGroupSystemMessages),
                        take(1),
                        map(groupSystemMessages => new LoadGroupSystemMessagesSuccess(groupSystemMessages))
                    ),
                ],
                webHandler: () => this.router.navigate([{
                    outlets: {aux: `validation-message`}
                }]),
                created
            });
        }
    }

    openCreateGroup(routerUrl: string) {
        this.electronStoreService.openPage(`create-group/${routerUrl}`, {
            width: 500,
            height: 500
        }, {
            key: 'create-group',
            actions: [
                this.store$.pipe(
                    select(getUserConfig),
                    take(1),
                    map(userConfig => new LoadUserConfigSuccess(userConfig))
                ),
                this.store$.pipe(
                    select(getAllUsers),
                    take(1),
                    map(users => new LoadUsersSuccess(users))
                ),
                this.store$.pipe(
                    select(getAllUserFriends),
                    take(1),
                    map(userFriends => new LoadUserFriendsSuccess(userFriends))
                ),
                this.store$.pipe(
                    select(getAllFriendGroupings),
                    take(1),
                    map(friendGroupings => new LoadFriendGroupingsSuccess(friendGroupings))
                ),
                this.store$.pipe(
                    select(getUser),
                    take(1),
                    map(user => new LoginSuccess(user))
                )

            ]
        });
    }

    openLookupWindow(routerUrl: string) {
        this.electronStoreService.openPage(`lookup/${routerUrl}`, {
            width: 810,
            height: 620
        }, {
            key: 'lookup',
            actions: [
                this.store$.pipe(
                    select(getUserConfig),
                    take(1),
                    map(userConfig => new LoadUserConfigSuccess(userConfig))
                )
            ]
        });
    }

    initLoginTray() {
        // 系统托盘右键菜单
        const template = [{
            label: '打开主面板',
            click: () => this.electronService.remote.getCurrentWindow().show()
        }, {
            label: '退出',
            click: () => this.electronService.remote.app.quit()
        }];
        this.electronService.tray.setContextMenuTemplate(template);
        this.electronService.tray.setToolTip(this.electronService.remote.app.getName());
        this.electronService.tray.on('click',
            () => this.electronService.remote.getCurrentWindow().show());
    }

    initHomeTray() {
        this.store$.pipe(
            select(getUserConfig),
            filter(userConfig => !!userConfig),
            take(1)
        ).subscribe(({turnOffAllSounds, closeHeadFlicker}) => {
            const template = [{
                label: '我在线上',
                type: 'normal',
                click: () => this.store$.dispatch(new ChangeOnlineStatus(OnlineStatus.ONLINE))
            }, {
                label: '隐身',
                type: 'normal',
                click: () => this.store$.dispatch(new ChangeOnlineStatus(OnlineStatus.STEALTH))
            }, {
                label: '忙碌',
                type: 'normal',
                click: () => this.store$.dispatch(new ChangeOnlineStatus(OnlineStatus.BUSYNESS))
            }, {
                label: '离开',
                type: 'normal',
                click: () => this.store$.dispatch(new ChangeOnlineStatus(OnlineStatus.LEAVE))
            }, {
                label: '离线',
                type: 'normal',
                click: () => this.store$.dispatch(new ChangeOnlineStatus(OnlineStatus.OFFLINE))
            }, {
                type: 'separator'
            }, {
                label: '关闭所有声音',
                type: 'checkbox',
                checked: turnOffAllSounds,
                click: () => this.store$.dispatch(new UpdateUserConfig({
                    turnOffAllSounds: !turnOffAllSounds
                }))
            }, {
                label: '关闭头像闪动',
                type: 'checkbox',
                checked: closeHeadFlicker,
                click: () => this.store$.dispatch(new UpdateUserConfig({
                    closeHeadFlicker: !closeHeadFlicker
                }))
            }, {
                type: 'separator'
            }, {
                label: '锁定moon',
                type: 'normal',
                click: () => {
                }
            }, {
                type: 'separator'
            }, {
                label: '打开主面板',
                type: 'normal',
                click: () => this.electronService.remote.getCurrentWindow().show()
            }, {
                label: '退出',
                type: 'normal',
                click: () => this.electronService.remote.app.quit()
            }];
            this.electronService.tray.setContextMenuTemplate(template);

            this.electronService.tray.on('click', () => {
                if (!this.electronService.remote.getCurrentWindow().isDestroyed()) {
                    this.electronService.remote.getCurrentWindow().show();
                }
            });

            this.store$.pipe(
                select(getUser),
                filter(user => !!user),
                take(1)
            ).subscribe(({name, id}) => this.electronService.tray.setToolTip(`moon: ${name}(${id})
声音: ${turnOffAllSounds ? '开启' : '关闭'}
消息提醒框: ${closeHeadFlicker ? '开启' : '关闭'}
会话消息: 任务栏头像${closeHeadFlicker ? '' : '不'}闪动`));
        });
    }
}
