import {NgModule} from '@angular/core';
import {NgxElementResizableDirective} from './directives/ngx-element-resizable.directive';
import {NgxElemntResizableService} from './services/ngx-elemnt-resizable.service';

@NgModule({
    imports: [],
    providers: [NgxElemntResizableService],
    declarations: [NgxElementResizableDirective],
    exports: [NgxElementResizableDirective]
})
export class NgxElementResizableModule {
}
