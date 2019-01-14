import {getStatusText, InMemoryDbService, RequestInfo, ResponseOptions, STATUS} from 'angular-in-memory-web-api';
import {OnlineStatus} from './enums/online-status';
import {AddSourceType} from './modules/main/enums/add-source-type';
import {AddStatus} from './modules/main/enums/add-status';
import {UserConfig} from './modules/main/models/user-config';
import {ImgShowType} from './modules/main/enums/img-show-type';
import {FriendNameShowType} from './modules/main/enums/friend-name-show-type';
import {ListShowType} from './modules/main/enums/list-show-type';
import {FriendListSortType} from './modules/main/enums/friend-list-sort-type';
import {UserFriend} from './modules/main/models/user-friend.model';
import {UserGroup} from './modules/main/models/user-group.model';
import {GroupIdentityType} from './modules/main/enums/group-identity-type';
import {GroupStatus} from './modules/main/enums/group-status';
import {Group} from './modules/main/models/group.model';
import {GroupGrouping} from './modules/main/models/group-grouping.model';
import {FriendGrouping} from './modules/main/models/friend-grouping.model';
import {FriendGroupingType} from './modules/main/models/friend-grouping-type.enum';
import {FriendMessage} from './modules/main/models/friend-message.model';
import {GroupMessage} from './modules/main/models/group-message.model';
import {ChatType} from './modules/main/enums/chat-type';
import {GroupSystemMessage} from './modules/main/models/group-system-message';
import {FriendValidation} from './modules/main/models/friend-validation';
import {Skin} from './modules/main/models/skin';
import {HttpRequest} from '@angular/common/http';

export class InMemoryDateService implements InMemoryDbService {
    url = 'http://pic2.sc.chinaz.com/files/pic/pic9/201804/bpic6683.jpg';
    users = [{
        id: 1,
        name: 'wangl',
        imageUrl: this.url,
        onlineStatus: OnlineStatus.ONLINE,
        saying: 'coding change world!!!',
        userConfigId: 1
    }, {
        id: 2,
        name: 'wangl2',
        imageUrl: this.url,
        onlineStatus: OnlineStatus.OFFLINE,
        saying: 'coding change world!!!',
        userConfigId: 1
    }, {
        id: 3,
        name: 'wangl3',
        imageUrl: this.url,
        onlineStatus: OnlineStatus.ONLINE,
        saying: 'coding change world!!!',
        userConfigId: 1
    }, {
        id: 4,
        name: 'wangl4',
        imageUrl: this.url,
        onlineStatus: OnlineStatus.ONLINE,
        saying: 'coding change world!!!',
        userConfigId: 1
    }, {
        id: 5,
        name: 'wangl5',
        imageUrl: this.url,
        onlineStatus: OnlineStatus.ONLINE,
        saying: 'coding change world!!!',
        userConfigId: 1
    }];
    userConfigs: UserConfig[] = [{
        id: 1,
        userId: 1,
        friendImgShowType: ImgShowType.BIG_IMG,
        friendSelectedShowBigImg: false,
        friendNameShowType: FriendNameShowType.NICKNAME,
        listShowType: ListShowType.MULTIPLE_COLUMNS_TILES,
        showSimpleFriend: false,
        friendListSortType: FriendListSortType.IDENTITY,
        showOnlineFriend: false,
        showStranger: false,
        showBlackList: false,
        groupImgShowType: ImgShowType.BIG_IMG,
        groupSelectedShowBigImg: false,
        background: '#009BDB',
        opacity: .9,
        closeHeadFlicker: false,
        turnOffAllSounds: false
    }];

    createDb() {

        const now = new Date().getTime();

        const userFriends: UserFriend[] = [{
            id: 1,
            friendId: 1,
            friendGroupingId: 1,
            shield: true,
            stealth: false,
            remark: 'remark123'
        }, {
            id: 2,
            friendId: 2,
            friendGroupingId: 1,
            shield: true,
            stealth: false
        }, {
            id: 3,
            friendId: 3,
            friendGroupingId: 2,
            shield: true,
            stealth: false
        }];
        const userGroups: UserGroup[] = [{
            id: 1,
            groupStatus: GroupStatus.NORMAL,
            groupGroupingId: 1,
            groupId: 1,
            receive: true,
            groupIdentityType: GroupIdentityType.ADMINISTRATOR,
            level: 0,
            memberId: 1,
            remark: 'remark1'
        }, {
            id: 2,
            groupStatus: GroupStatus.NORMAL,
            groupGroupingId: 1,
            groupId: 2,
            receive: true,
            groupIdentityType: GroupIdentityType.ADMINISTRATOR,
            level: 0,
            memberId: 1,
            remark: 'remark2'
        }, {
            id: 3,
            groupStatus: GroupStatus.NORMAL,
            groupGroupingId: 1,
            groupId: 3,
            receive: true,
            groupIdentityType: GroupIdentityType.ADMINISTRATOR,
            level: 0,
            memberId: 1
        }];
        const groups: Group[] = [{
            id: 1,
            name: '群组一',
            imageUrl: this.url,
            ownerId: 1,
        }, {
            id: 2,
            name: '群组二',
            imageUrl: this.url,
            ownerId: 1
        }, {
            id: 3,
            name: '群组三',
            imageUrl: this.url,
            ownerId: 1,
        }];
        const groupGroupings: GroupGrouping[] = [{
            id: 1,
            name: '好友群',
            sort: 0
        }];

        const friendGroupings: FriendGrouping[] = [{
            id: 1,
            name: '我的好友',
            open: false,
            sort: 0,
            type: FriendGroupingType.MY_FRIENDS
        }, {
            id: 2,
            name: '我的好友1',
            open: false,
            sort: 1,
            type: FriendGroupingType.CUSTOM
        }, {
            id: 6,
            name: '我的好友2',
            open: false,
            sort: 2,
            type: FriendGroupingType.CUSTOM
        }, {
            id: 3,
            name: '公众号',
            open: false,
            sort: 100,
            type: FriendGroupingType.OFFICIAL_ACCOUNTS
        }, {
            id: 4,
            name: '陌生人',
            open: false,
            sort: 101,
            type: FriendGroupingType.STRANGER
        }, {
            id: 5,
            name: '黑名单',
            open: false,
            sort: 102,
            type: FriendGroupingType.BLANK_LIST
        }];

        const friendMessages: FriendMessage[] = [{
            id: 1,
            receiverId: 2,
            content: '你好啊',
            senderId: 2,
            sendTime: now.valueOf()
        }, {
            id: 2,
            receiverId: 2,
            content: '你好啊',
            senderId: 2,
            sendTime: now.valueOf()
        }, {
            id: 4,
            receiverId: 2,
            content: '你好啊',
            senderId: 2,
            sendTime: now.valueOf()
        }, {
            id: 5,
            receiverId: 2,
            content: '你好啊',
            senderId: 1,
            sendTime: now.valueOf(),
            sendError: true
        }];
        const groupMessages: GroupMessage[] = [{
            id: 1,
            groupId: 2,
            content: '你好啊',
            senderId: 2,
            sendTime: now.valueOf()
        }, {
            id: 2,
            groupId: 2,
            content: '你好啊',
            senderId: 2,
            sendTime: now.valueOf()
        }, {
            id: 4,
            groupId: 2,
            content: '你好啊',
            senderId: 2,
            sendTime: now.valueOf()
        }, {
            id: 5,
            groupId: 2,
            content: '你好啊',
            senderId: 1,
            sendTime: now.valueOf()
        }];
        const conversations = [{
            id: 1,
            chatId: 1,
            chatType: ChatType.FRIEND,
            senderId: 1,
            sendTime: now - 100000,
            content: '你好我是xiaoming',
            unreadCount: 29
        }, {
            id: 2,
            chatId: 2,
            chatType: ChatType.FRIEND,
            senderId: 1,
            sendTime: now - 100000,
            content: '你好我是xiaoming',
            unreadCount: 12
        }, {
            id: 3,
            chatId: 1,
            chatType: ChatType.GROUP,
            senderId: 2,
            sendTime: now + 100000,
            content: '你好我是xiaoming',
            unreadCount: 0
        }, {
            id: 4,
            chatId: 2,
            chatType: ChatType.GROUP,
            senderId: 1,
            sendTime: now + 100,
            content: '你好我是xiaoming',
            unreadCount: 0
        }, {
            id: 5,
            chatId: null,
            chatType: ChatType.VILIDATION_MESSAGE,
            senderId: 1,
            sendTime: now + 100,
            content: '暂无验证消息',
            unreadCount: 0
        }];
        const groupSystemMessages: GroupSystemMessage[] = [{
            id: 1,
            groupId: 1,
            inviterId: 1,
            submitTime: now + 100,
            agreeTime: now + 100,
            status: AddStatus.AGREE,
            userId: 1
        }];
        const friendValidations: FriendValidation[] = [{
            id: 1,
            applyTime: 1,
            applicantId: 2,
            agreeTime: now + 100,
            status: AddStatus.AGREE,
            userId: 1,
            addSourceType: AddSourceType.LOOKUP
        }, {
            id: 2,
            applyTime: 1,
            applicantId: 2,
            agreeTime: now + 100,
            status: AddStatus.WAITING,
            userId: 1,
            addSourceType: AddSourceType.LOOKUP
        }, {
            id: 3,
            applyTime: 1,
            applicantId: 2,
            agreeTime: now + 100,
            status: AddStatus.REJECT,
            userId: 1,
            addSourceType: AddSourceType.LOOKUP
        }, {
            id: 4,
            applyTime: 1,
            applicantId: 2,
            agreeTime: now + 100,
            status: AddStatus.IGNORE,
            userId: 1,
            addSourceType: AddSourceType.LOOKUP
        }, {
            id: 5,
            applyTime: 1,
            applicantId: 1,
            agreeTime: now + 100,
            status: AddStatus.AGREE,
            userId: 11,
            addSourceType: AddSourceType.LOOKUP
        }, {
            id: 6,
            applyTime: 1,
            applicantId: 1,
            agreeTime: now + 100,
            status: AddStatus.WAITING,
            userId: 11,
            addSourceType: AddSourceType.LOOKUP
        }, {
            id: 7,
            applyTime: 1,
            applicantId: 1,
            agreeTime: now + 100,
            status: AddStatus.REJECT,
            userId: 11,
            addSourceType: AddSourceType.LOOKUP
        }, {
            id: 8,
            applyTime: 1,
            applicantId: 1,
            agreeTime: now + 100,
            status: AddStatus.IGNORE,
            userId: 11,
            addSourceType: AddSourceType.LOOKUP
        }];
        const lookupUsers = [{...this.users[0], friendGroupId: 1},
            {...this.users[1], friendGroupId: 1},
            {...this.users[2], friendGroupId: 1}];
        const auth = [];
        const skins: Skin[] = [{
            id: 1,
            sort: 1,
            name: '图1',
            url: 'http://img.qq1234.org/uploads/allimg/151215/11_151215113705_15.jpg',
            usedNumber: 24
        }, {
            id: 2,
            sort: 2,
            name: '图2',
            url: 'http://img.qq1234.org/uploads/allimg/160118/11_160118114719_8.jpg',
            usedNumber: 24
        }, {
            id: 3,
            sort: 3,
            name: '图3',
            url: 'http://p1.gexing.com/G1/M00/B3/8A/rBACE1IbAZ6jZ8kdAADnPBaOF1M359.jpg',
            usedNumber: 24
        }, {
            id: 4,
            sort: 4,
            name: '图4',
            url: 'http://p1.gexing.com/G1/M00/02/47/rBACJlQ7DBbSydS4AAAmGqPZ-TM960.jpg',
            usedNumber: 24
        }];

        return {
            auth, groups, friendGroupings, conversations, friendMessages, groupMessages, users: this.users,
            userFriends, lookupUsers, groupGroupings, userGroups, groupSystemMessages, friendValidations,
            userConfigs: this.userConfigs, skins
        };
    }

    genId<T extends { id: any }>(collection: T[], collectionName: string): any {
        if (collection) {
            console.log(`genId override for '${collectionName}'`);
            return 1 + collection.reduce((prev, curr) => Math.max(prev, curr.id || 0), 1000);
        }
        return null;
    }

    post(reqInfo: RequestInfo) {
        if (reqInfo.collectionName === 'auth') {
            return reqInfo.utils.createResponse$(() => {
                console.log('HTTP GET override');
                const dataEncapsulation = reqInfo.utils.getConfig().dataEncapsulation;
                const data = this.users[0];
                const options: ResponseOptions = {
                    body: dataEncapsulation ? {data} : data,
                    status: STATUS.OK
                };
                return this.finishOptions(options, reqInfo);
            });
        } else if (reqInfo.collectionName === 'friendMessages' ||
            reqInfo.collectionName === 'groupMessages') {
            return reqInfo.utils.createResponse$(() => {
                const dataEncapsulation = reqInfo.utils.getConfig().dataEncapsulation;
                const data = {
                    id: new Date().getTime(),
                    senderId: 1,
                    sendTime: new Date().getTime()
                };
                const options: ResponseOptions = {
                    body: dataEncapsulation ? {data} : data,
                    status: STATUS.OK
                };
                return this.finishOptions(options, reqInfo);
            });
        } else if (reqInfo.collectionName === 'groups') {
            return reqInfo.utils.createResponse$(() => {
                const dataEncapsulation = reqInfo.utils.getConfig().dataEncapsulation;
                const data = {
                    id: new Date().getTime(),
                    ownerId: 1,
                    createTime: new Date().getTime(),
                    ...(<HttpRequest<any>> reqInfo.req).body.params
                };
                const options: ResponseOptions = {
                    body: dataEncapsulation ? {data} : data,
                    status: STATUS.OK
                };
                return this.finishOptions(options, reqInfo);
            });
        }
        return undefined;
    }

    // HTTP GET interceptor
    get(reqInfo: RequestInfo) {
        const collectionName = reqInfo.collectionName;
        if (collectionName === 'userConfigs') {
            return this.getUserConfigs(reqInfo);
        } else if (collectionName === 'i18n') {
            return this.getI18nJson(reqInfo);
        }
        return undefined; // let the default GET handle all others
    }

    put(reqInfo: RequestInfo) {
        return reqInfo.utils.createResponse$(() => {
            const dataEncapsulation = reqInfo.utils.getConfig().dataEncapsulation;
            let data = reqInfo.collection.find(d => d.id === reqInfo.id);
            data = {...data, ...(reqInfo.req as any).body};
            return {
                body: dataEncapsulation ? {data} : data,
                status: STATUS.OK
            };
        });
    }

    patch(reqInfo: RequestInfo) {
        return reqInfo.utils.createResponse$(() => {
            const dataEncapsulation = reqInfo.utils.getConfig().dataEncapsulation;
            let data = reqInfo.collection.find(d => d.id === reqInfo.id);
            data = {...data, ...(reqInfo.req as any).body};
            return {
                body: dataEncapsulation ? {data} : data,
                status: STATUS.OK
            };
        });
    }

    delete(reqInfo: RequestInfo) {
        return reqInfo.utils.createResponse$(() => {
            const dataEncapsulation = reqInfo.utils.getConfig().dataEncapsulation;
            let data = reqInfo.collection.find(d => d.id === reqInfo.id);
            data = {...data, ...(reqInfo.req as any).body};
            return {
                body: dataEncapsulation ? {data} : data,
                status: STATUS.OK
            };
        });
    }

    responseInterceptor(resOptions: ResponseOptions, reqInfo: RequestInfo) {
        resOptions.headers.set('x-test', 'dev-header');
        const method = reqInfo.method.toUpperCase();
        const body = JSON.stringify(resOptions);
        console.log(`responseInterceptor: ${method} ${reqInfo.req.url}: \n${body}`);
        return resOptions;
    }

    private getUserConfigs(reqInfo: RequestInfo) {
        return reqInfo.utils.createResponse$(() => {
            const data = this.userConfigs[0];
            const dataEncapsulation = reqInfo.utils.getConfig().dataEncapsulation;
            console.log(reqInfo);
            const options: ResponseOptions = {
                body: dataEncapsulation ? {data} : data,
                status: STATUS.OK
            };
            return this.finishOptions(options, reqInfo);
        });
    }


    private getI18nJson(reqInfo: RequestInfo) {
        return reqInfo.utils.createResponse$(() => {
            const oReq = new XMLHttpRequest();
            console.log(`请求地址：${reqInfo.url}`);
            oReq.open('GET', reqInfo.url, false); // 同步请求
            oReq.send(null);
            const data = JSON.parse(oReq.responseText);
            console.log(`请求i18n:`);
            console.log(data);
            const dataEncapsulation = reqInfo.utils.getConfig().dataEncapsulation;
            const options: ResponseOptions = {
                body: data,
                status: STATUS.OK
            };
            return this.finishOptions(options, reqInfo);
        });
    }
    // HTTP GET interceptor handles requests for villains
    private getVillains(reqInfo: RequestInfo) {
        return reqInfo.utils.createResponse$(() => {
            console.log('HTTP GET override');
            const collection = [].slice();
            const dataEncapsulation = reqInfo.utils.getConfig().dataEncapsulation;
            const id = reqInfo.id;
            // tslint:disable-next-line:triple-equals
            const data = id == undefined ? collection : reqInfo.utils.findById(collection, id);
            const options: ResponseOptions = data ?
                {
                    body: dataEncapsulation ? {data} : data,
                    status: STATUS.OK
                } : {
                    body: {error: `'Villains' with id='${id}' not found`},
                    status: STATUS.NOT_FOUND
                };
            return this.finishOptions(options, reqInfo);
        });
    }

    private finishOptions(options: ResponseOptions, {headers, url}: RequestInfo) {
        options.statusText = getStatusText(options.status);
        options.headers = headers;
        options.url = url;
        return options;
    }
}
