import {Component, Inject, OnInit} from '@angular/core';
import {DeleteGroupGrouping} from '../../actions/group-grouping.action';
import {Store} from '@ngrx/store';
import {DeleteFriendGrouping} from '../../actions/friend-grouping.action';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
    selector: 'app-delete-grouping-confirm',
    templateUrl: 'delete-grouping-confirm-index.component.html',
    styleUrls: ['delete-grouping-confirm-index.component.scss']
})
export class DeleteGroupingConfirmIndexComponent implements OnInit {

    groupingType: number;
    groupingId: number;

    constructor(public dialogRef: MatDialogRef<DeleteGroupingConfirmIndexComponent>,
                @Inject(MAT_DIALOG_DATA) public data: {groupingType, groupingId},
                private store$: Store<any>) {}

    ngOnInit(): void {
        this.groupingId = this.data.groupingId;
        this.groupingType = this.data.groupingType;
    }

    confirm() {
        if (this.groupingType === 0) {
            this.store$.dispatch(new DeleteGroupGrouping(this.groupingId));
        } else {
            this.store$.dispatch(new DeleteFriendGrouping(this.groupingId));
        }
        this.dialogRef.close();
    }

    cancel() {
        this.dialogRef.close();
    }
}
