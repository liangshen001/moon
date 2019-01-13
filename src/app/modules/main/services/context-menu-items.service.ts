import {Injectable} from '@angular/core';
import {UserFriend} from '../models/user-friend.model';
import {DeleteUserFriend, FriendChangeFriendGrouping, UpdateUserFriend} from '../actions/user-friend.actions';
import {Store} from '@ngrx/store';
import {GroupStatus} from '../enums/group-status';
import {Conversation} from '../models/conversation';
import {User} from '../../../models/user.model';
import {State} from '../reducers';
import {RemoveConversation, UpdateConversation} from '../actions/conversation.actions';
import {FriendGrouping} from '../models/friend-grouping.model';
import {OpenAddFriendGroupingInput, OpenRenameFriendGroupingInput, UpdateFriendGrouping} from '../actions/friend-grouping.action';
import {FriendGroupingType} from '../models/friend-grouping-type.enum';
import {UserGroup} from '../models/user-group.model';
import {ExitUserGroup, GroupChangeGroupGrouping, UpdateUserGroup} from '../actions/user-group.action';
import {GroupGrouping} from '../models/group-grouping.model';
import {OpenAddGroupGroupingInput, OpenRenameGroupGroupingInput} from '../actions/group-grouping.action';
import {MatDialog} from '@angular/material';
import {DeleteGroupingConfirmIndexComponent} from '../components/delete-grouping-confirm/delete-grouping-confirm-index.component';
import {AddFriendComponent} from '../components/add-friend/add-friend.component';
import {UserConfig} from '../models/user-config';
import {ImgShowType} from '../enums/img-show-type';
import {FriendNameShowType} from '../enums/friend-name-show-type';
import {ListShowType} from '../enums/list-show-type';
import {FriendListSortType} from '../enums/friend-list-sort-type';
import {UpdateUserConfig} from '../actions/user-config.actions';
import {ChatType} from '../enums/chat-type';
import {UpdateRemarkComponent} from '../components/update-remark/update-remark.component';
import {NgxElectronDataService} from '@ngx-electron/data';
import {ElectronWindowService} from '../../../services/electron-window.service';

@Injectable()
export class ContextMenuItemsService {

    constructor(private store$: Store<State>,
                private electronStoreService: NgxElectronDataService,
                public dialog: MatDialog,
                private electronWindowService: ElectronWindowService) {
    }

    private static separatorMenuItem(show = true) {
        return {
            type: 'separator',
            show: show
        };
    }

    private groupImgShowTypeMenuItem(userConfig: UserConfig) {
        return {
            label: '头像显示',
            submenu: [{
                type: 'checkbox',
                label: '大头像',
                checked: userConfig.groupImgShowType === ImgShowType.BIG_IMG,
                click: () => this.store$.dispatch(new UpdateUserConfig({
                    groupImgShowType: ImgShowType.BIG_IMG
                }))
            }, {
                type: 'checkbox',
                label: '小头像',
                checked: userConfig.groupImgShowType === ImgShowType.SMALL_IMG,
                click: () => this.store$.dispatch(new UpdateUserConfig({
                    groupImgShowType: ImgShowType.SMALL_IMG
                }))
            }, ContextMenuItemsService.separatorMenuItem(), {
                type: 'checkbox',
                label: '选中时显示大头像',
                enabled: userConfig.groupImgShowType === ImgShowType.SMALL_IMG,
                checked: userConfig.groupSelectedShowBigImg,
                click: () => this.store$.dispatch(new UpdateUserConfig({
                    groupSelectedShowBigImg: !userConfig.groupSelectedShowBigImg
                }))
            }]
        };
    }

    private friendImgShowTypeMenuItem(userConfig: UserConfig) {
        return {
            label: '头像显示',
            submenu: [{
                type: 'checkbox',
                label: '大头像',
                checked: userConfig.friendImgShowType === ImgShowType.BIG_IMG,
                click: () => this.store$.dispatch(new UpdateUserConfig({
                    friendImgShowType: ImgShowType.BIG_IMG
                }))
            }, {
                type: 'checkbox',
                label: '小头像',
                checked: userConfig.friendImgShowType === ImgShowType.SMALL_IMG,
                click: () => this.store$.dispatch(new UpdateUserConfig({
                    friendImgShowType: ImgShowType.SMALL_IMG
                }))
            }, ContextMenuItemsService.separatorMenuItem(), {
                type: 'checkbox',
                label: '选中时显示大头像',
                enabled: userConfig.friendImgShowType === ImgShowType.SMALL_IMG,
                checked: userConfig.friendSelectedShowBigImg,
                click: () => this.store$.dispatch(new UpdateUserConfig({
                    friendSelectedShowBigImg: !userConfig.friendSelectedShowBigImg
                }))
            }]
        };
    }

    private friendNameShowTypeMenuItem(userConfig: UserConfig) {
        return {
            label: '名称显示',
            submenu: [{
                type: 'checkbox',
                label: '显示备注和昵称',
                enabled: userConfig.friendImgShowType === ImgShowType.BIG_IMG,
                checked: userConfig.friendImgShowType === ImgShowType.BIG_IMG &&
                userConfig.friendNameShowType === FriendNameShowType.REMARK_AND_NICKNAME,
                click: () => this.store$.dispatch(new UpdateUserConfig({
                    friendNameShowType: FriendNameShowType.REMARK_AND_NICKNAME
                }))
            }, {
                type: 'checkbox',
                label: '显示备注',
                checked: userConfig.friendNameShowType === FriendNameShowType.REMARK || userConfig.friendImgShowType !== ImgShowType.BIG_IMG
                && userConfig.friendNameShowType === FriendNameShowType.REMARK_AND_NICKNAME,
                click: () => this.store$.dispatch(new UpdateUserConfig({
                    friendNameShowType: FriendNameShowType.REMARK
                }))
            }, {
                type: 'checkbox',
                label: '显示昵称',
                checked: userConfig.friendNameShowType === FriendNameShowType.NICKNAME,
                click: () => this.store$.dispatch(new UpdateUserConfig({
                    friendNameShowType: FriendNameShowType.NICKNAME
                }))
            }]
        };
    }

    private listShowTypeMenuItem(userConfig: UserConfig) {
        return {
            label: '列表显示',
            submenu: [{
                type: 'checkbox',
                label: '单列显示',
                checked: userConfig.listShowType === ListShowType.SINGLE_ROW_SHOWS,
                click: () => this.store$.dispatch(new UpdateUserConfig({
                    listShowType: ListShowType.SINGLE_ROW_SHOWS
                }))
            }, {
                type: 'checkbox',
                label: '多列平铺',
                checked: userConfig.listShowType === ListShowType.MULTIPLE_COLUMNS_TILES,
                click: () => this.store$.dispatch(new UpdateUserConfig({
                    listShowType: ListShowType.MULTIPLE_COLUMNS_TILES
                }))
            }, ContextMenuItemsService.separatorMenuItem(), {
                type: 'checkbox',
                label: '显示清爽资料',
                checked: userConfig.showSimpleFriend,
                click: () => this.store$.dispatch(new UpdateUserConfig({
                    showSimpleFriend: !userConfig.showSimpleFriend
                }))
            }]
        };
    }

    private friendListSortTypeMenuItem(userConfig: UserConfig) {
        return {
            label: '排序显示',
            submenu: [{
                type: 'checkbox',
                label: '按身份标识排序',
                checked: userConfig.friendListSortType === FriendListSortType.IDENTITY,
                click: () => this.store$.dispatch(new UpdateUserConfig({
                    friendListSortType: FriendListSortType.IDENTITY
                }))
            }, {
                type: 'checkbox',
                label: '按名称排序',
                checked: userConfig.friendListSortType === FriendListSortType.NAME,
                click: () => this.store$.dispatch(new UpdateUserConfig({
                    friendListSortType: FriendListSortType.NAME
                }))
            }]
        };
    }

    private sendMessageForFriendMenuItem(userId) {
        return {
            label: '发送即时消息',
            type: 'normal',
            click: () => this.electronWindowService.openChatRoom(ChatType.FRIEND, userId)
        };
    }
    private sendMessageForGroupMenuItem(userGroup) {
        return {
            label: '发送群消息',
            type: 'normal',
            click: () => this.electronWindowService.openChatRoom(ChatType.GROUP, userGroup.groupId)
        };
    }
    private permissionsSettingsForFriendMenuItem(userFriend) {
        return {
            label: '设置权限',
            submenu: [{
                type: 'checkbox',
                label: '屏蔽此人消息',
                checked: userFriend.shield,
                click: () => this.store$.dispatch(new UpdateUserFriend({
                    id: userFriend.id,
                    changes: {
                        shield: !userFriend.shield
                    }
                }))
            }, {
                type: 'checkbox',
                label: '在线对其隐身',
                checked: userFriend.stealth,
                click: () => this.store$.dispatch(new UpdateUserFriend({
                    id: userFriend.id,
                    changes: {
                        stealth: !userFriend.stealth
                    }
                }))
            }, {
                type: 'checkbox',
                label: '隐身对其可见',
                checked: userFriend.visible,
                click: () => this.store$.dispatch(new UpdateUserFriend({
                    id: userFriend.id,
                    changes: {
                        visible: !userFriend.visible
                    }
                }))
            }]
        };
    }

    private messageSettingsForGroupMenuItem(userGroup) {
        return {
            label: '群消息设置',
            submenu: [{
                type: 'checkbox',
                label: '接收消息并提醒',
                checked: userGroup.groupStatus === GroupStatus.NORMAL,
                click: () => this.store$.dispatch(new UpdateUserGroup({
                    id: userGroup.id,
                    changes: {
                        groupStatus: GroupStatus.NORMAL
                    }}))
            }, {
                type: 'checkbox',
                label: '接收消息但不提醒',
                checked: userGroup.groupStatus === GroupStatus.NO_PROMPT,
                click: () => this.store$.dispatch(new UpdateUserGroup({
                    id: userGroup.id,
                    changes: {
                        groupStatus: GroupStatus.NO_PROMPT
                    }}))
            }, {
                type: 'checkbox',
                label: '屏蔽群消息',
                checked: userGroup.groupStatus === GroupStatus.SHIELD,
                click: () => this.store$.dispatch(new UpdateUserGroup({
                    id: userGroup.id,
                    changes: {
                        groupStatus: GroupStatus.SHIELD
                    }}))
            }]
        };
    }
    private topSettingConversationMenuItem(conversation) {
        return {
            label: conversation.top ? '取消会话置顶' : '会话置顶',
            type: 'normal',
            click: () =>
                this.store$.dispatch(new UpdateConversation({
                    id: conversation.id,
                    changes: {
                        top: !conversation.top
                    }
                }))
        };
    }
    private removeConversationMenuItem(conversation) {
        return {
            label: '从会话列表中移除',
            type: 'normal',
            click: () => this.store$.dispatch(new RemoveConversation(conversation.id))
        };
    }
    private exitGroupMenuItem(userGroup, conversation?) {
        return {
            label: '退出该群',
            type: 'normal',
            click: () => {
                if (conversation) {
                    this.store$.dispatch(new RemoveConversation(conversation.id));
                }
                this.store$.dispatch(new ExitUserGroup(userGroup.groupId));
            }
        };
    }
    private deleteFriendMenuItem(userFriend, conversation?) {
        return {
            label: '删除好友',
            type: 'normal',
            click: () => {
                if (conversation) {
                    this.store$.dispatch(new RemoveConversation(conversation.id));
                }
                this.store$.dispatch(new DeleteUserFriend(userFriend.id));
            }
        };
    }
    private addAsFriendsMenuItem(userId: number) {
        return {
            label: '加为好友',
            type: 'normal',
            click: () => this.dialog.open(AddFriendComponent, {
                width: '250px',
                data: {userId}
            })
        };
    }
    private showOnlineFriendMenuItem(userConfig: UserConfig) {
        return {
            label: `显示${userConfig.showOnlineFriend ? '全部' : '在线'}联系人`,
            type: 'normal',
            click: () => this.store$.dispatch(new UpdateUserConfig({
                showOnlineFriend: !userConfig.showOnlineFriend
            }))
        };
    }
    private stealthFriendGroupingMenuItem(friendGrouping) {
        return {
            label: '在线对该分组隐身',
            checked: friendGrouping.stealth,
            type: 'checkbox',
            click: () => this.store$.dispatch(new UpdateFriendGrouping({
                id: friendGrouping.id,
                changes: {
                    stealth: !friendGrouping.stealth
                }
            }))
        };
    }
    private visibleFriendGroupingMenuItem(friendGrouping) {
        return {
            label: '隐身对该分组可见',
            checked: friendGrouping.visible,
            type: 'checkbox',
            click: () => this.store$.dispatch(new UpdateFriendGrouping({
                id: friendGrouping.id,
                changes: {
                    visible: !friendGrouping.visible
                }
            }))
        };
    }
    private renameFriendGroupingMenuItem(friendGrouping, input) {
        return {
            label: '重命名',
            type: 'normal',
            enabled: friendGrouping.type === FriendGroupingType.CUSTOM || friendGrouping.type === FriendGroupingType.MY_FRIENDS,
            click: () => {
                this.store$.dispatch(new OpenRenameFriendGroupingInput(friendGrouping.id));
                // setTimeout(() => input.focus());
            }
        };
    }
    private deleteFriendGroupingMenuItem(friendGrouping) {
        return {
            label: '删除该组',
            type: 'normal',
            enabled: friendGrouping.type === FriendGroupingType.CUSTOM,
            click: () => this.dialog.open(DeleteGroupingConfirmIndexComponent, {
                width: '250px',
                data: {groupingType: 1, groupingId: friendGrouping.id}
            })
        };
    }
    private addFriendGroupingMenuItem() {
        return {
            label: '添加分组',
            type: 'normal',
            click: () => this.store$.dispatch(new OpenAddFriendGroupingInput())
        };
    }
    private showOfficialAccountsMenuItem(showOfficialAccounts) {
        return {
            label: '显示公众号分组',
            type: 'checkbox',
            checked: showOfficialAccounts,
            click: () => this.store$.dispatch(new UpdateUserConfig({}))
        };
    }
    private showStrangerMenuItem(showStranger) {
        return {
            label: '显示陌生人分组',
            type: 'checkbox',
            checked: showStranger,
            click: () => this.store$.dispatch(new UpdateUserConfig({
                showStranger: !showStranger
            }))
        };
    }
    private showBlackListMenuItem(showBlackList) {
        return {
            label: '显示黑名单',
            type: 'checkbox',
            checked: showBlackList,
            click: () => this.store$.dispatch(new UpdateUserConfig({
                showBlackList: !showBlackList
            }))
        };
    }
    private findAndAddGroupMenuItem() {
        return {
            label: '查询添加群',
            type: 'normal',
            click: () => this.electronWindowService.openLookupWindow('group')
        };
    }
    private createGroupMenuItem() {
        return {
            label: '创建一个群',
            type: 'normal',
            click: () => this.electronWindowService.openCreateGroup('categories')
            //     this.electronStoreService.openPage({
            //     url: 'create-group'
            // })
                // this.windowControlService.openCreateGroupWindow()
        };
    }
    private addGroupGroupingMenuItem() {
        return {
            label: '添加群分组',
            type: 'normal',
            click: () => this.store$.dispatch(new OpenAddGroupGroupingInput())
        };
    }
    private renameGroupGroupingMenuItem(groupGroupingId) {
        return {
            label: '重命名群分组',
            type: 'normal',
            click: () => this.store$.dispatch(new OpenRenameGroupGroupingInput(groupGroupingId))
        };
    }
    private deleteGroupGroupingMenuItem(groupGrouping) {
        return {
            label: '删除群分组',
            type: 'normal',
            enabled: !groupGrouping.system,
            click: () => this.dialog.open(DeleteGroupingConfirmIndexComponent, {
                width: '250px',
                data: {groupingType: 0, groupingId: groupGrouping.id}
            })
        };
    }
    private updateGroupRemarkMenuItem(userGroup: UserGroup) {
        return {
            label: '修改备注名称',
            type: 'normal',
            click: () => this.dialog.open(UpdateRemarkComponent, {
                width: '250px',
                data: {remark: userGroup.remark, id: userGroup.id, chatType: ChatType.GROUP}
            })
        };
    }
    private updateFriendRemarkMenuItem(userFriend: UserFriend) {
        return {
            label: '修改备注姓名',
            type: 'normal',
            click: () => this.dialog.open(UpdateRemarkComponent, {
                width: '250px',
                data: {remark: userFriend.remark, id: userFriend.id, chatType: ChatType.GROUP}
            })
        };
    }
    private moveFriendToMenuItem(userFriend: UserFriend, friendGroupings: FriendGrouping[]) {
        return {
            label: '移动联系人至',
            submenu: friendGroupings.filter(friendGrouping => friendGrouping.type !== FriendGroupingType.STRANGER)
                .map(friendGrouping => {
                    return {
                        label: friendGrouping.name,
                        click: () => this.store$.dispatch(new FriendChangeFriendGrouping({
                            id: userFriend.id,
                            friendGroupingId: friendGrouping.id
                        }))
                    };
                })
        };
    }
    private moveGFriendToMenuItem(userGroup: UserGroup, groupGroupings: GroupGrouping[]) {
        return {
            label: '移动群至',
            submenu: groupGroupings.map(groupGrouping => {
                    return {
                        label: groupGrouping.name,
                        click: () => this.store$.dispatch(new GroupChangeGroupGrouping({
                            id: userGroup.id,
                            groupGroupingId: groupGrouping.id
                        }))
                    };
                })
        };
    }

    getFriendRowContextMenuItems(userFriend: UserFriend, friendGroupings: FriendGrouping[]) {
        return [
            this.sendMessageForFriendMenuItem(userFriend.friendId),
            ContextMenuItemsService.separatorMenuItem(),
            this.permissionsSettingsForFriendMenuItem(userFriend),
            this.updateFriendRemarkMenuItem(userFriend),
            this.moveFriendToMenuItem(userFriend, friendGroupings),
            ContextMenuItemsService.separatorMenuItem(),
            this.deleteFriendMenuItem(userFriend)
        ];
    }

    getGroupRowContextMenuItems(userGroup: UserGroup, groupGroupings: GroupGrouping[]) {
        return [
            this.sendMessageForGroupMenuItem(userGroup),
            ContextMenuItemsService.separatorMenuItem(),
            this.messageSettingsForGroupMenuItem(userGroup),
            this.updateGroupRemarkMenuItem(userGroup),
            this.moveGFriendToMenuItem(userGroup, groupGroupings),
            ContextMenuItemsService.separatorMenuItem(),
            this.exitGroupMenuItem(userGroup)
        ];
    }

    getFriendConversationRowContextMenuItems(userFriend: UserFriend, conversation: Conversation) {
        return [
            this.sendMessageForFriendMenuItem(userFriend.friendId),
            ContextMenuItemsService.separatorMenuItem(),
            this.permissionsSettingsForFriendMenuItem(userFriend),
            ContextMenuItemsService.separatorMenuItem(),
            this.topSettingConversationMenuItem(conversation),
            this.removeConversationMenuItem(conversation),
            ContextMenuItemsService.separatorMenuItem(),
            this.deleteFriendMenuItem(userFriend, conversation)
        ];
    }

    getGroupConversationRowContextMenuItems(userGroup: UserGroup, conversation: Conversation) {
        return [
            this.sendMessageForGroupMenuItem(userGroup),
            ContextMenuItemsService.separatorMenuItem(),
            this.messageSettingsForGroupMenuItem(userGroup),
            ContextMenuItemsService.separatorMenuItem(),
            this.topSettingConversationMenuItem(conversation),
            this.removeConversationMenuItem(conversation),
            ContextMenuItemsService.separatorMenuItem(),
            this.exitGroupMenuItem(userGroup, conversation)
        ];
    }

    getGroupMemberRowContextMenuItems(user: User, userFriend: UserFriend) {

        return userFriend ? [
            this.sendMessageForFriendMenuItem(user.id),
            ContextMenuItemsService.separatorMenuItem(!!userFriend),
            this.deleteFriendMenuItem(userFriend)
        ] : [
            this.addAsFriendsMenuItem(user.id)
        ];
    }

    getFriendGroupingRowContextMenuItems(userConfig: UserConfig,
                                         friendGrouping: FriendGrouping,
                                         input: HTMLInputElement) {
        return [
            this.showOnlineFriendMenuItem(userConfig),
            ContextMenuItemsService.separatorMenuItem(),
            this.stealthFriendGroupingMenuItem(friendGrouping),
            this.visibleFriendGroupingMenuItem(friendGrouping),
            ContextMenuItemsService.separatorMenuItem(),
            this.addFriendGroupingMenuItem(),
            this.renameFriendGroupingMenuItem(friendGrouping, input),
            this.deleteFriendGroupingMenuItem(friendGrouping),
        ];
    }

    getFriendGroupingPenalContextMenuItems(userConfig: UserConfig) {
        return [
            this.friendImgShowTypeMenuItem(userConfig),
            this.friendNameShowTypeMenuItem(userConfig),
            this.listShowTypeMenuItem(userConfig),
            ContextMenuItemsService.separatorMenuItem(),
            this.friendListSortTypeMenuItem(userConfig),
            ContextMenuItemsService.separatorMenuItem(),
            this.showOnlineFriendMenuItem(userConfig),
            ContextMenuItemsService.separatorMenuItem(),
            // this.showOfficialAccountsMenuItem(userConfig.showOfficialAccounts),
            this.showStrangerMenuItem(userConfig.showStranger),
            this.showBlackListMenuItem(userConfig.showBlackList),
            ContextMenuItemsService.separatorMenuItem(),
            this.addFriendGroupingMenuItem(),
        ];

    }

    getGroupGroupingRowContextMenuItems(groupGrouping: GroupGrouping) {
        return [
            this.findAndAddGroupMenuItem(),
            this.createGroupMenuItem(),
            ContextMenuItemsService.separatorMenuItem(),
            this.addGroupGroupingMenuItem(),
            this.renameGroupGroupingMenuItem(groupGrouping.id),
            this.deleteGroupGroupingMenuItem(groupGrouping)
        ];
    }

    getGroupGroupingPenalContextMenuItems(userConfig: UserConfig) {
        return [
            this.groupImgShowTypeMenuItem(userConfig),
            this.listShowTypeMenuItem(userConfig),
            ContextMenuItemsService.separatorMenuItem(),
            this.findAndAddGroupMenuItem(),
            this.createGroupMenuItem(),
            ContextMenuItemsService.separatorMenuItem(),
            this.addGroupGroupingMenuItem()
        ];
    }

    getValidationMessageRowContextMenuItems(conversation) {
        return [
            this.topSettingConversationMenuItem(conversation),
            this.removeConversationMenuItem(conversation)
        ];
    }
}
