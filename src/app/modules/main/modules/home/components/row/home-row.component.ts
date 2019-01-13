import {Component, Input, OnInit} from '@angular/core';
import {ImgShowType} from '../../../../enums/img-show-type';
import {ListShowType} from '../../../../enums/list-show-type';
import {UserConfig} from '../../../../models/user-config';
import {ChatType} from '../../../../enums/chat-type';
import {FriendNameShowType} from '../../../../enums/friend-name-show-type';

@Component({
    selector: 'app-home-row',
    templateUrl: 'home-row.component.html',
    styleUrls: ['home-row.component.scss']
})

export class HomeRowComponent implements OnInit {

    @Input()
    chatType: ChatType.GROUP | ChatType.FRIEND;

    @Input()
    userConfig: UserConfig;

    @Input()
    remark: string;

    @Input()
    menuItems: any[];

    selected: boolean;

    @Input()
    grayImg: boolean;

    @Input()
    dragging: boolean;

    @Input()
    imageUrl: string;

    @Input()
    name: string;

    @Input()
    desc: string;

    constructor() {
    }

    ngOnInit() {
    }

    isSmallImg() {
        if (!this.userConfig) {
            return false;
        }
        if (this.chatType === ChatType.FRIEND) {
            return this.userConfig.friendImgShowType === ImgShowType.SMALL_IMG
                && (!this.selected || !this.userConfig.friendSelectedShowBigImg);
        } else if (this.chatType === ChatType.GROUP) {
            return this.userConfig.groupImgShowType === ImgShowType.SMALL_IMG
                && (!this.selected || !this.userConfig.groupSelectedShowBigImg);
        }
    }

    isMultipleColumnsTiles() {
        if (!this.userConfig) {
            return false;
        }
        return this.userConfig.listShowType === ListShowType.MULTIPLE_COLUMNS_TILES;
    }

    getTitle() {
        if (!this.userConfig) {
            return '';
        }
        if (this.chatType === ChatType.FRIEND) {
            switch (this.userConfig.friendNameShowType) {
                case FriendNameShowType.REMARK_AND_NICKNAME:
                case FriendNameShowType.REMARK:
                    return this.remark ? this.remark : this.name;
                case FriendNameShowType.NICKNAME:
                    return this.name;
            }
        } else if (this.chatType === ChatType.GROUP) {
            return this.remark ? this.remark : this.name;
        }
    }

    getSubtitle() {
        if (!this.userConfig || this.userConfig.friendImgShowType === ImgShowType.SMALL_IMG) {
            return '';
        }
        if (this.chatType === ChatType.FRIEND) {
            switch (this.userConfig.friendNameShowType) {
                case FriendNameShowType.REMARK_AND_NICKNAME:
                    return this.remark ? `(${this.name})` : '';
                case FriendNameShowType.REMARK:
                case FriendNameShowType.NICKNAME:
                    return '';
            }
        } else if (this.chatType === ChatType.GROUP) {
            return '';
        }
    }

    getDesc() {
        if (this.chatType === ChatType.FRIEND) {
            return this.userConfig.showSimpleFriend ? '' : this.desc;
        } else if (this.chatType === ChatType.GROUP) {
            return '';
        }
    }
}
