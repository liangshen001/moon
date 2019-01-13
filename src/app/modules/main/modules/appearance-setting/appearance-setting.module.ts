import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatButtonModule, MatButtonToggleModule, MatIconModule, MatSliderModule} from '@angular/material';
import {containers} from './containers';
import {AppearanceSettingRoutingModule} from './appearance-setting-routing.module';
import {ColorPickerModule} from 'ngx-color-picker';
import {NgxElectronCoreModule} from '@ngx-electron/core';
import {EffectsModule} from '@ngrx/effects';
import {effects} from './effects';
import {services} from './services';
import {NgxElectronDataModule} from '@ngx-electron/data';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MatIconModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatSliderModule,
        TranslateModule,

        ColorPickerModule,
        NgxElectronCoreModule,
        NgxElectronDataModule,
        AppearanceSettingRoutingModule,
        EffectsModule.forFeature(effects)
    ],
    declarations: [
        ...containers
    ],
    providers: services
})
export class AppearanceSettingModule {
}
