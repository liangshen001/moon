import {Component, OnInit} from '@angular/core';
import {NgxElectronService} from '@ngx-electron/core';

@Component({
    selector: 'app-test-test1',
    template: `
        <ngx-electron-window [showCloseBtn]="true" [showMiniBtn]="true">
            <header></header>
            <h2>
               {{title}}
            </h2>
            <h3>
                <a href="javascript:void(0);" (click)="openTest2()">open test2</a>
            </h3>
            <h3>
                <a href="javascript:void(0);" (click)="sendData1ToTest2()">send data1 to test2</a>
            </h3>
            <h3>
                <a href="javascript:void(0);" (click)="sendData2ToTest2()">send data2 to test2</a>
            </h3>
        </ngx-electron-window>
    `
})
export class TestTest1Component implements OnInit {

    title = 'test1';

    constructor(private electronService: NgxElectronService) {}

    ngOnInit() {
    }
    openTest2() {
        this.electronService.openPage('test/test2', {
            height: 764,
            width: 1024,
        }, {
            initData: this.title
        });
    }
    sendData1ToTest2() {
        this.electronService.send('data1');
    }
    sendData2ToTest2() {
        this.electronService.send('data2');
    }
}
