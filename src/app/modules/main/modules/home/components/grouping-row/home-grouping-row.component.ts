import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {GroupingRow} from '../../../../models/grouping-row.model';

@Component({
    selector: 'app-home-grouping-row',
    templateUrl: 'home-grouping-row.component.html',
    styleUrls: ['home-grouping-row.component.scss']
})
export class HomeGroupingRowComponent implements OnInit {

    @Input()
    groupingDraggable: boolean;

    @Input()
    groupingDragging: boolean;

    @Output()
    openOrClose = new EventEmitter();

    @Output()
    changeGrouping = new EventEmitter<DragEvent>();

    @Output()
    groupingChangeSort = new EventEmitter<{
        id: number,
        changeSort: number
    }>();

    @Output()
    groupingDragStart = new EventEmitter<DragEvent>();

    @Output()
    closeRenameGroupingInput = new EventEmitter<string>();

    @Input()
    menuItems: any[];

    @Input()
    grouping: GroupingRow;

    @Input()
    itemDragging: boolean;

    @Input()
    onlineRate: string;

    topDragOver: boolean;

    bottomDragOver: boolean;

    @ViewChild('groupingNameInput')
    groupingNameInput: ElementRef<HTMLInputElement>;

    ngOnInit(): void {
      this.groupingNameInput.nativeElement.value = this.grouping.name;
        // this.newGroupingName = this.grouping.name;
    }

    drop(event, type?: number) {
        this.topDragOver = false;
        this.bottomDragOver = false;
        const groupingStr = event.dataTransfer.getData('grouping');
        if ((type === undefined) !== (groupingStr === undefined)) {
            return;
        }
        if (groupingStr) {
            const dropSort = this.grouping.sort;
            const grouping: GroupingRow = JSON.parse(groupingStr);
            const direct = dropSort - grouping.sort;
            let changeSort;
            if (direct === 0) {
                return;
            } else if (direct > 0) {
                changeSort = type === 1 ? (dropSort - 1) : dropSort;
            } else {
                changeSort = type === 1 ? dropSort : (dropSort + 1);
            }
            if (changeSort === grouping.sort) {
                return;
            }
            this.groupingChangeSort.emit({
                id: grouping.id,
                changeSort
            });
        } else {
            this.changeGrouping.emit(event);
        }
    }

    dragStart(event: DragEvent) {
        event.dataTransfer.setData('grouping', JSON.stringify(this.grouping));
        this.groupingDragStart.emit();
    }

    setTopDragOver(value: boolean) {
        // 当前必须是分组排序 当前元素必须可分组排序且不是正在排序的元素
        if (this.groupingDragging && this.groupingDraggable) {
            this.topDragOver = value;
        }
    }

    setBottomDragOver(value: boolean) {
        if (this.groupingDragging && this.groupingDraggable) {
            this.bottomDragOver = value;
        }
    }

    rename() {
      this.closeRenameGroupingInput.emit(this.groupingNameInput.nativeElement.value);
    }
}
