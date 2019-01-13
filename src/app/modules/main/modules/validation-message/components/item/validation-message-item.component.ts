import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AddStatus} from '../../../../enums/add-status';
import {AddSourceType} from '../../../../enums/add-source-type';
import {Group} from '../../../../models/group.model';
import {User} from '../../../../../../models/user.model';

@Component({
    selector: 'app-validation-message-item',
    templateUrl: 'validation-message-item.component.html',
    styleUrls: ['validation-message-item.component.scss']
})

export class ValidationMessageItemComponent implements OnInit {


    @Input()
    isSender: boolean;

    @Input()
    imageUrl: string;

    @Input()
    user: User;

    @Input()
    addSourceType: AddSourceType;

    @Input()
    status: AddStatus;

    @Input()
    time: number;

    @Input()
    group: Group;

    @Output()
    agree = new EventEmitter<object>();

    @Output()
    reject = new EventEmitter<object>();

    @Output()
    ignore = new EventEmitter<object>();

    @Output()
    close = new EventEmitter<object>();

    constructor() {
    }

    ngOnInit() {
    }

    isOperation() {
        return !this.isSender && this.status === AddStatus.WAITING;
    }
}
