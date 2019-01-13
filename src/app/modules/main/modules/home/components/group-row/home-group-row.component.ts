import {Component, HostListener, Input, OnDestroy, OnInit} from '@angular/core';
import {Group} from '../../../../models/group.model';
import {ContextMenuItemsService} from '../../../../services/context-menu-items.service';
import {select, Store} from '@ngrx/store';
import {UserGroup} from '../../../../models/user-group.model';
import {Observable} from 'rxjs';
import {getAllGroupGroupings, getGroupEntities, getUserConfig} from '../../../../reducers';
import {map} from 'rxjs/operators';
import {UserGroupDragStart} from '../../../../actions/user-group.action';
import {Subscription} from 'rxjs';
import {UserConfig} from '../../../../models/user-config';
import {ChatType} from '../../../../enums/chat-type';
import {ElectronWindowService} from '../../../../../../services/electron-window.service';

@Component({
    selector: 'app-home-group-row',
    templateUrl: './home-group-row.component.html',
    styleUrls: ['./home-group-row.component.scss']
})
export class HomeGroupRowComponent implements OnInit, OnDestroy {

    @Input()
    userGroup: UserGroup;

    group$: Observable<Group>;
    userConfig: UserConfig;

    menuItems: any[];

    dragging: boolean;

    private _userConfigSub: Subscription;
    private _groupGroupingsSub: Subscription;

    constructor(private homeContextMenuItemsService: ContextMenuItemsService,
                private store$: Store<any>,
                private electronWindowService: ElectronWindowService) {}

    ngOnInit(): void {
        this.group$ = this.store$.pipe(
            select(getGroupEntities),
            map(entities => entities[this.userGroup.groupId])
        );
        this._userConfigSub = this.store$.pipe(select(getUserConfig))
            .subscribe(userConfig => this.userConfig = userConfig);
        this._groupGroupingsSub = this.store$.pipe(
            select(getAllGroupGroupings),
            map(groupGroupings => groupGroupings.filter(
                groupGrouping => groupGrouping.id !== this.userGroup.groupGroupingId))
        ).subscribe(groupGroupings => this.menuItems =
            this.homeContextMenuItemsService.getGroupRowContextMenuItems(this.userGroup, groupGroupings));
    }

    @HostListener('dblclick')
    openGroupChatWindow() {
        this.electronWindowService.openChatRoom(ChatType.GROUP, this.userGroup.groupId);
    }

    @HostListener('dragstart', ['$event'])
    groupDragStart(event) {
        event.dataTransfer.setData('groupId', this.userGroup.groupId);
        this.store$.dispatch(new UserGroupDragStart());
        this.dragging = true;
        // this.store$.dispatch(new FriendGroupingOpenOrClose(this.friend.friendGroupingId));
        // this.store$.dispatch(new FriendGroupingOpenOrClose(this.friend.friendGroupingId));
    }

    ngOnDestroy(): void {
        this._groupGroupingsSub.unsubscribe();
        this._userConfigSub.unsubscribe();
    }

}
