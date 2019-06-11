import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SystemSettingsRoutingModule} from './system-settings-routing.module';
import {IndexComponent} from './containers/index/index.component';
import {BasicSettingsComponent} from './containers/basic-settings/basic-settings.component';
import {SecuritySettingsComponent} from './containers/security-settings/security-settings.component';
import {PermissionSettingsComponent} from './containers/permission-settings/permission-settings.component';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule, MatSelectModule
} from '@angular/material';
import {NgxElectronCoreModule} from '@ngx-electron/core';
import {NgxElectronDataModule} from '@ngx-electron/data';
import {SettingsTemplateComponent} from './components/settings-template/settings-template.component';
import {SettingsItemComponent} from './components/settings-item/settings-item.component';
import {FormsModule} from '@angular/forms';
import { SearchKeyPipePipe } from './pipes/search-key-pipe.pipe';

@NgModule({
    declarations: [
        IndexComponent,
        BasicSettingsComponent,
        SecuritySettingsComponent,
        PermissionSettingsComponent,
        SettingsTemplateComponent,
        SettingsItemComponent,
        SearchKeyPipePipe
    ],
    imports: [
        CommonModule,
        FormsModule,
        SystemSettingsRoutingModule,

        NgxElectronCoreModule,
        NgxElectronDataModule,
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatRadioModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonToggleModule,
        MatSelectModule,
        MatAutocompleteModule
    ]
})
export class SystemSettingsModule {
}
