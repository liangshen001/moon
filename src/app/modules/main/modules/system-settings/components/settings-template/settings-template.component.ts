import {AfterContentInit, Component, ContentChildren, OnInit, QueryList} from '@angular/core';
import {SettingsItemComponent} from '../settings-item/settings-item.component';

@Component({
    selector: 'app-settings-template',
    templateUrl: './settings-template.component.html',
    styleUrls: ['./settings-template.component.scss']
})
export class SettingsTemplateComponent implements OnInit, AfterContentInit {

    titles: string[];

    @ContentChildren(SettingsItemComponent)
    settingsItems: QueryList<SettingsItemComponent>;

    constructor() {
    }

    ngOnInit() {
    }
    ngAfterContentInit(): void {
        this.titles = this.settingsItems.map(item => item.title);
    }

}
