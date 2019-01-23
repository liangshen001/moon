import {Component, OnInit} from '@angular/core';
import {NgxElectronService} from '@ngx-electron/core';

@Component({
    selector: 'app-test',
    template: '<router-outlet></router-outlet>'
})
export class TestIndexComponent implements OnInit {

    constructor(private electronService: NgxElectronService) {}

    ngOnInit() {
    }
}
