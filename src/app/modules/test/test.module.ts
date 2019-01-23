import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxElectronCoreModule} from '@ngx-electron/core';
import {containers} from './containers';
import {components} from './components';
import {TestRoutingModule} from './test-routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        TestRoutingModule,
        NgxElectronCoreModule
    ],
    declarations: [
        ...containers,
        ...components
    ],
    providers: []
})
export class TestModule {
}
