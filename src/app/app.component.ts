import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {NgxElectronService} from '@ngx-electron/core';
import {environment} from '../environments/environment';

@Component({
    selector: 'app-root',
    template: '<router-outlet></router-outlet>'
})
export class AppComponent {
    constructor(public electronService: NgxElectronService,
                private translate: TranslateService) {
        translate.addLangs(['zh-CN', 'en-US']);
        translate.setDefaultLang('zh-CN');
        translate.resetLang(translate.getBrowserCultureLang());
        translate.use(translate.getBrowserCultureLang());
        if (electronService.isElectron()) {
            console.log('Mode electron');
        } else {
            console.log('Mode web');
        }

    }
}
