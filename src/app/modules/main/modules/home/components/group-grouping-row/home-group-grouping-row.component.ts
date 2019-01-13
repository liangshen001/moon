import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ContextMenuItemsService} from '../../../../services/context-menu-items.service';
import {GroupGrouping} from '../../../../models/group-grouping.model';
import {Subscription} from 'rxjs';
import {
    AddGroupGrouping,
    GroupGroupingChangeSort,
    GroupGroupingDragStart,
    GroupGroupingOpenOrClose,
    RenameGroupGrouping
} from '../../../../actions/group-grouping.action';
import {UserGroup} from '../../../../models/user-group.model';
import {GroupChangeGroupGrouping} from '../../../../actions/user-group.action';
import {getAllUserGroups, getUserGroupDragging, State} from '../../../../reducers';

@Component({
    selector: 'app-home-group-grouping-row',
    templateUrl: 'home-group-grouping-row.component.html'
})
export class HomeGroupGroupingRowComponent implements OnInit, OnDestroy {

    @Input()
    groupGrouping: GroupGrouping;

    userGroups$: Observable<UserGroup[]>;

    dragging$: Observable<boolean>;
    menuItems: any[] = [];

    private _subscription: Subscription;

    constructor(private store$: Store<State>,
                private contextMenuItemsService: ContextMenuItemsService) {}

    ngOnInit(): void {
        this.userGroups$ = this.store$.pipe(
            select(getAllUserGroups),
            map(userGroups => userGroups.filter(
                userGroup => userGroup.groupGroupingId === this.groupGrouping.id))
        );
        this.dragging$ = this.store$.pipe(select(getUserGroupDragging));
        this.menuItems = this.contextMenuItemsService.getGroupGroupingRowContextMenuItems(this.groupGrouping);
        // this._subscription = this.store$.pipe(select(getFriendGroupingConfig)).subscribe(
        //     friendGroupConfig => this.menuItems = this.contextMenuItemsService
        //         .getFriendGroupingRowContextMenuItems(friendGroupConfig, this.groupGrouping));
    }

    ngOnDestroy(): void {
    }

    openOrClose() {
        this.groupGrouping.renaming || this.groupGrouping.adding ||
        this.store$.dispatch(new GroupGroupingOpenOrClose(this.groupGrouping.id));
    }

    changeGroupGrouping(event: DragEvent) {
        const id = +event.dataTransfer.getData('groupId');
        this.store$.dispatch(new GroupChangeGroupGrouping({id, groupGroupingId: this.groupGrouping.id}));
    }

    closeRenameGroupGroupingInput(name: string) {
        this.groupGrouping.renaming && this.store$.dispatch(new RenameGroupGrouping({id: this.groupGrouping.id, name}));
        this.groupGrouping.adding && this.store$.dispatch(new AddGroupGrouping({id: this.groupGrouping.id, name}));
    }

    groupGroupingDragStart() {
        this.store$.dispatch(new GroupGroupingDragStart(this.groupGrouping.id));
    }

    groupGroupingChangeSort(param: {id: number, changeSort: number}) {
        this.store$.dispatch(new GroupGroupingChangeSort(param));
    }
}
