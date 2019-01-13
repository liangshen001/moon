import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Store} from '@ngrx/store';
import {UpdateUserFriend} from '../../actions/user-friend.actions';
import {UpdateUserGroup} from '../../actions/user-group.action';
import {ChatType} from '../../enums/chat-type';

@Component({
    selector: 'update-remark',
    templateUrl: 'update-remark.component.html',
    styleUrls: ['update-remark.component.scss']
})

export class UpdateRemarkComponent implements OnInit {

    remark: string;
    chatType: ChatType;

    constructor(public dialogRef: MatDialogRef<UpdateRemarkComponent>,
                @Inject(MAT_DIALOG_DATA) public data: {remark: string, chatType: ChatType, id: number},
                private store$: Store<any>) {
    }

    ngOnInit() {
        this.remark = this.data.remark;
        this.chatType = this.data.chatType;
    }

    cancel() {
        this.dialogRef.close();
    }
    confirm() {
        const payload = {
            id: this.data.id,
            changes: {
                remark: this.remark
            }
        };
        if (this.chatType === ChatType.FRIEND) {
            this.store$.dispatch(new UpdateUserFriend(payload));
        } else if (this.chatType === ChatType.GROUP) {
            this.store$.dispatch(new UpdateUserGroup(payload));
        }
    }
}
