import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {StompRService} from '@stomp/ng2-stompjs';
import {select, Store} from '@ngrx/store';
import {debounceTime, distinctUntilChanged, filter, map, mergeMap, switchMap, take, tap} from 'rxjs/operators';
import {FormControl} from '@angular/forms';
import {environment} from '../../../../../../../environments/environment';
import {User} from '../../../../../../models/user.model';
import {getUser} from '../../../../../../reducers';
import {getAllConversations, getAllUserGroups, getUserConfig, getUserEntities, getUserFriendEntities} from '../../../../reducers';
import {LoadFriendGroupings} from '../../../../actions/friend-grouping.action';
import {LoadUserFriends} from '../../../../actions/user-friend.actions';
import {AddConversation, LoadConversations, UpdateConversation} from '../../../../actions/conversation.actions';
import {FriendMessage} from '../../../../models/friend-message.model';
import {AddFriendMessage} from '../../../../actions/friend-message.actions';
import {GroupMessage} from '../../../../models/group-message.model';
import {GroupStatus} from '../../../../enums/group-status';
import {AddGroupMessage} from '../../../../actions/group-message.actions';
import {OnlineStatus} from '../../../../../../enums/online-status';
import {ChangeUser, LoadUsers} from '../../../../actions/user.action';
import {LoadGroupGroupings} from '../../../../actions/group-grouping.action';
import {Subscription} from 'rxjs';
import {LoadUserGroups} from '../../../../actions/user-group.action';
import {ChangeOnlineStatus, EditSaying, LoginSuccess} from '../../../../../../actions/app.actions';
import {Observable} from 'rxjs';
import {LoadGroups} from '../../../../actions/group.actions';
import {AddFriendValidation, LoadFriendValidation} from '../../../../actions/friend-validation.actions';
import {LoadGroupSystemMessages} from '../../../../actions/group-system-message.actions';
import {LoadUserConfig} from '../../../../actions/user-config.actions';
import {UserConfig} from '../../../../models/user-config';
import {AppService} from '../../../../../../services/app.service';
import {NgxElectronDataService} from '@ngx-electron/data';
import {NgxElectronService} from '@ngx-electron/core';
import {ElectronWindowService} from '../../../../../../services/electron-window.service';

@Component({
    selector: 'app-home-index',
    templateUrl: './home-index.component.html',
    styleUrls: ['./home-index.component.scss'],
    providers: [
        StompRService
    ]
})
export class HomeIndexComponent implements OnInit, OnDestroy {

    @ViewChild('shakeAudioElement')
    shakeAudioElement: ElementRef;

    @ViewChild('msgAudioElement')
    msgAudioElement: ElementRef;

    @ViewChild('onlineAudioElement')
    onlineAudioElement: ElementRef;
    isSearch: boolean;

    @ViewChild('searchInput')
    searchInput: ElementRef;

    @ViewChild('sayingEditInput')
    sayingEditInput: ElementRef;

    editingSaying: boolean;

    user$: Observable<User>;

    searchControl = new FormControl();

    isShowPopup = false;

    userConfig$: Observable<UserConfig>;

    private _subs: Subscription[] = [];

    constructor(private router: Router,
                private stompService: StompRService,
                private electronService: NgxElectronService,
                private store$: Store<any>,
                private electronStoreService: NgxElectronDataService,
                private authService: AppService,
                private electronWindowService: ElectronWindowService) {
    }

    ngOnInit() {
        this.stompService.config = {
            url: environment.getStompUrl(),
            headers: {
                // withCredentials: true
            },
            heartbeat_in: 0,
            heartbeat_out: environment.production ? 20000 : 3000000,
            reconnect_delay: environment.production ? 5000 : 20000000,
            debug: !environment.production
        };
        this.stompService.initAndConnect();

        if (this.electronService.isElectron()) {

            this.store$.dispatch(new LoginSuccess({
                id: 1,
                name: 'wangl',
                imageUrl: 'http://pic2.sc.chinaz.com/files/pic/pic9/201804/bpic6683.jpg',
                onlineStatus: OnlineStatus.ONLINE,
                saying: 'coding change world!!!',
                userConfigId: 1
            }));

            // 初始化好友列表
            this.store$.dispatch(new LoadUsers());
            // 初始化好友分组列表
            this.store$.dispatch(new LoadFriendGroupings());
            // 初始化好友列表
            this.store$.dispatch(new LoadUserFriends());
            // 初始化群组列表
            this.store$.dispatch(new LoadGroups());
            // 初始化会话列表
            this.store$.dispatch(new LoadConversations());
            // 初始化群分组列表
            this.store$.dispatch(new LoadGroupGroupings());
            // 加载当前用户与群组关系列表
            this.store$.dispatch(new LoadUserGroups());
            // 加载群系统消息
            this.store$.dispatch(new LoadGroupSystemMessages());
            // 加载好友验证
            this.store$.dispatch(new LoadFriendValidation());
            // 加载用户个性化配置
            this.store$.dispatch(new LoadUserConfig());
            // 如果不是切换账号 则退出app
            this.electronService.ipcRenderer.on('logout',
                (e, switchAccount) => this.authService.logout().subscribe(
                    () => !switchAccount && this.electronService.remote.app.quit()));
            this.electronWindowService.initHomeTray();
        }
        this.user$ = this.store$.pipe(select(getUser));
        this.userConfig$ = this.store$.pipe(select(getUserConfig));
        // 监听登录用户
        this.store$.pipe(
            select(getUser),
            filter(user => !!user),
            take(1),
            tap(() => this.electronService.ipcRenderer.send('init-home-success')),
            map(user => user.id)
        ).subscribe(userId => this.subscribeStomp(userId));

        // 监听搜索框中值的变化
        this._subs.push(this.searchControl.valueChanges.pipe(
            debounceTime(400),
            distinctUntilChanged()
        ).subscribe(key => this.router.navigate(['home/search', key])));
    }

    subscribeStomp(userId: number) {
        // // 监听好友聊天消息
        this._subs.push(this.stompService.subscribe(`/user/${userId}/friendMessage`).pipe(
            map(message => JSON.parse(message.body)),
            // 根据是否屏蔽判断是否好友消息提醒
            mergeMap((friendMessage: FriendMessage) => this.store$.pipe(
                select(getUserFriendEntities),
                take(1),
                switchMap(entities => this.store$.pipe(
                    select(getUserConfig),
                    filter(userConfig => !!userConfig),
                    take(1),
                    tap(({turnOffAllSounds}) => turnOffAllSounds || !entities[friendMessage.receiverId].shield &&
                        this.msgAudioElement.nativeElement.play()),
                )),
                map(() => friendMessage)
            )),
        ).subscribe(friendMessage => this.electronStoreService.dispatch(new AddFriendMessage(friendMessage))));

        // 监听群组聊天消息
        this._subs.push(this.stompService.subscribe(`/user/${userId}/groupMessage`).pipe(
            map(message => JSON.parse(message.body)),
            // 根据是否屏蔽判断是否群组消息提醒
            mergeMap((groupMessage: GroupMessage) => this.store$.pipe(
                select(getAllUserGroups),
                take(1),
                switchMap(userGroups => this.store$.pipe(
                    select(getUserConfig),
                    filter(userConfig => !!userConfig),
                    take(1),
                    tap(({turnOffAllSounds}) => turnOffAllSounds ||
                        userGroups.find(userGroup => userGroup.groupId === groupMessage.groupId)
                            .groupStatus === GroupStatus.NORMAL && this.msgAudioElement.nativeElement.play())
                )),
                switchMap(() => this.store$.pipe(
                    select(getUserEntities),
                    take(1),
                )),
                map(entities => entities[groupMessage.senderId]),
                map(sender => {
                    return {...groupMessage, senderName: sender.name};
                }),
            ))
        ).subscribe(groupMessage => this.electronStoreService.dispatch(new AddGroupMessage(groupMessage))));


        // 监听震动
        this._subs.push(this.stompService.subscribe(`/user/${userId}/shake`).pipe(
            map(message => JSON.parse(message.body)),
            switchMap(userGroups => this.store$.pipe(
                select(getUserConfig),
                filter(userConfig => !!userConfig),
                take(1),
                tap(({turnOffAllSounds}) => turnOffAllSounds || this.shakeAudioElement.nativeElement.play())
            )),
        ).subscribe(friendId => {
            // const key = `${ ChatType.FRIEND }_${ friendId }`;
            // if (this.chats.has(key)) {
            //     this.chats.get(key).focus();
            //     this.electronService.ipcRenderer.send(`shake_${ friendId }`);
            // } else {
            //     this.openChatWindow(friendId, ChatType.FRIEND);
            // }
        }));

        // 监听好友变化conversation
        this._subs.push(this.stompService.subscribe(`/user/${userId}/changeUser`).pipe(
            map(message => JSON.parse(message.body)),
            // 如果好友之前状态是 下线, 则好友上线提醒
            tap(({id}) =>
                this.store$.pipe(
                    select(getUserEntities),
                    take(1),
                    filter(entities => entities[id].onlineStatus === OnlineStatus.OFFLINE),
                    switchMap(() => this.store$.pipe(
                        select(getUserConfig),
                        filter(userConfig => !!userConfig),
                        take(1)
                    ))
                ).subscribe(({turnOffAllSounds}) => turnOffAllSounds || this.onlineAudioElement.nativeElement.play()),
            )
        ).subscribe(user => this.store$.dispatch(new ChangeUser(user))));

        // 监听添加会话
        this._subs.push(this.stompService.subscribe(`/user/${userId}/conversation`).pipe(
            map(message => JSON.parse(message.body)),
        ).subscribe(conversation => this.store$.dispatch(new AddConversation(conversation))));
        // 监听添加验证信息
        this._subs.push(this.stompService.subscribe(`/user/${userId}/friendValidation`).pipe(
            map(message => JSON.parse(message.body)),
        ).subscribe(friendValidation => this.store$.dispatch(new AddFriendValidation(friendValidation))));
    }

    /**
     * 切换账号
     */
    switchAccount(): void {
        this.electronWindowService.switchAccount();
    }

    /**
     * 退出登录
     */
    logout(): void {
        this.electronService.remote.app.quit();
    }

    /**
     * 打开查找窗口
     */
    openLookupWindow(): void {
        this.electronWindowService.openLookupWindow('user');
    }

    toSearch(): void {
        // 显示搜索框 方法执行完才能渲染
        this.isSearch = true;
        // 这里需要异步 因为搜索框需要在显示 并渲染之后
        setTimeout(() => {
            // 转到搜索路由
            this.router.navigateByUrl('home/search');
            // this.router.navigate(['search', this.searchControl.value ? this.searchControl.value : '']);
            // 让搜索框获得焦点
            this.searchInput.nativeElement.focus();
        });
    }

    returnChatList(): void {
        this.router.navigate(['home/chat-list']);
        this.isSearch = false;
    }

    changeOnlineStatus(onlineStatus: OnlineStatus) {
        this.store$.dispatch(new ChangeOnlineStatus(onlineStatus));
    }

    ngOnDestroy(): void {
        this._subs.forEach(sub => sub.unsubscribe());
    }

    // click() {
    //     this.router.navigateByUrl('main/index/home/index/(chat-list//aux:chat-room/friend/1)');
    //     // this.router.navigate(['home', {outlets: {primary: 'search', right: 'test'}}]);
    //     // this.router.navigate([{ outlets: { aux: 'test2' }}]);
    // }
    editSaying() {
        const saying = this.sayingEditInput.nativeElement.value;
        this.editingSaying = false;
        this.store$.pipe(
            select(getUser),
            take(1)
        ).subscribe(user => {
            if (user && user.saying !== saying) {
                this.store$.dispatch(new EditSaying(saying));
            }
        });
    }

    openSayingEdit() {
        this.editingSaying = true;
        setTimeout(() => this.sayingEditInput.nativeElement.focus());
    }

    openAppearanceSettingWin() {
        this.electronWindowService.openAppearanceSetting('skin-setting');
    }
}
