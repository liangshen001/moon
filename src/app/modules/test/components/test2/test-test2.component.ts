import {Component, OnInit} from '@angular/core';
import {NgxElectronService} from '@ngx-electron/core';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-test-test2',
    template: `
        <ngx-electron-window [showCloseBtn]="true" [showMiniBtn]="true">
            <header></header>
            <h2>
               {{title}}
            </h2>
            <h3>
                <label>initData:{{initData}}</label>
            </h3>
            <h3>
                <label>data:{{data$ | async}}</label>
            </h3>
        </ngx-electron-window>
    `
})
export class TestTest2Component implements OnInit {

    title = 'test2';

    initData: string;
    data$: Observable<string>;

    constructor(private electronService: NgxElectronService) {}

    ngOnInit() {
        this.initData = this.electronService.initData;
        this.data$ = this.electronService.data();
    }
}
