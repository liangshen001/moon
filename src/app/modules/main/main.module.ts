import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {effects} from './effects';
import {reducers} from './reducers';
import {guards} from './guards';
import {containers} from './containers';
import {MainRoutingModule} from './main-routing.module';
import {services} from './services';
import {MatButtonModule, MatDialogModule, MatInputModule} from '@angular/material';
import {entryComponents} from './components';
import {FormsModule} from '@angular/forms';
import {NgxElectronCoreModule} from '@ngx-electron/core';
import {NgxElectronDataModule} from '@ngx-electron/data';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgxElectronCoreModule,
        NgxElectronDataModule,
        MatDialogModule,
        MatButtonModule,
        MatInputModule,
        MainRoutingModule,
        StoreModule.forFeature('main', reducers),
        EffectsModule.forFeature(effects)
    ],
    declarations: [
        ...containers,
        ...entryComponents,
    ],
    providers: [
        ...services,
        ...guards
    ],
    entryComponents
})
export class MainModule {
}
