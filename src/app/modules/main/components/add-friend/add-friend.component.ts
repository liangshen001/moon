import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
    selector: 'app-add-friend',
    templateUrl: 'add-friend.component.html',
    styleUrls: ['add-friend.component.scss']
})
export class AddFriendComponent implements OnInit {

    constructor(public dialogRef: MatDialogRef<AddFriendComponent>,
                @Inject(MAT_DIALOG_DATA) public data: {userId}) {}

    ngOnInit(): void {
      console.log(this.data.userId);
    }
}
