import {ModuleWithProviders, NgModule} from '@angular/core';
import {NgxRowService} from './ngx-row.service';
import {NgxRowDirective} from './ngx-row.directive';

@NgModule({
    imports: [],
    declarations: [
        NgxRowDirective
    ],
    providers: [
        NgxRowService
    ],
    exports: [NgxRowDirective]
})
export class NgxRowModule {
}

