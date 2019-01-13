import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatBadgeModule, MatButtonModule, MatIconModule, MatInputModule, MatMenuModule, MatTabsModule} from '@angular/material';

import {HomeRoutingModule} from './home-routing.module';
import {components} from './components';
import {containers} from './containers';
import {directives} from './directives';
import {pipes} from './pipes';
import {services} from './services';
import {StoreModule} from '@ngrx/store';
import {reducers} from './reducers';
import {NgxElectronCoreModule} from '@ngx-electron/core';
import {NgxElectronDataModule} from '@ngx-electron/data';
import {NgxElementResizableModule} from 'ngx-element-resizable';
import {NgxRowModule} from 'ngx-row';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        HomeRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        MatTabsModule,
        MatButtonModule,
        MatInputModule,
        MatBadgeModule,
        MatMenuModule,
        NgxElectronCoreModule,
        NgxElectronDataModule,
        NgxElementResizableModule,
        NgxRowModule,
        TranslateModule,
        StoreModule.forFeature('home', reducers),
        // EffectsModule.forFeature(effects),
    ],
    providers: services,
    declarations: [
        ...components,
        ...containers,
        ...directives,
        ...pipes
    ],
})
export class HomeModule {
}
