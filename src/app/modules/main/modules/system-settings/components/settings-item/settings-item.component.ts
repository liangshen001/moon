import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-settings-item',
    templateUrl: './settings-item.component.html',
    styleUrls: ['./settings-item.component.scss']
})
export class SettingsItemComponent implements OnInit {

    @Input()
    title: string;

    constructor() {
    }

    ngOnInit() {
    }

}
