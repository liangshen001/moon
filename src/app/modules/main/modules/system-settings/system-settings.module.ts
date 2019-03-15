import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SystemSettingsRoutingModule} from './system-settings-routing.module';
import {IndexComponent} from './containers/index/index.component';
import {BasicSettingsComponent} from './containers/basic-settings/basic-settings.component';
import {SecuritySettingsComponent} from './containers/security-settings/security-settings.component';
import {PermissionSettingsComponent} from './containers/permission-settings/permission-settings.component';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatCommonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule
} from '@angular/material';
import {NgxElectronCoreModule} from '@ngx-electron/core';
import {NgxElectronDataModule} from '@ngx-electron/data';
import { SettingsTemplateComponent } from './components/settings-template/settings-template.component';
import { SettingsItemComponent } from './components/settings-item/settings-item.component';

@NgModule({
    declarations: [IndexComponent, BasicSettingsComponent, SecuritySettingsComponent, PermissionSettingsComponent, SettingsTemplateComponent, SettingsItemComponent],
    imports: [
        CommonModule,
        SystemSettingsRoutingModule,

        NgxElectronCoreModule,
        NgxElectronDataModule,
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatRadioModule,
        MatFormFieldModule,
        MatInputModule
    ]
})
export class SystemSettingsModule {
}
