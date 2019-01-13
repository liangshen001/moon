import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatTabsModule
} from '@angular/material';
import {ValidationMessageRoutingModule} from './validation-message-routing.module';
import {pipes} from './pipes';
import {containers} from './containers';
import {components} from './components';
import {NgxElectronCoreModule} from '@ngx-electron/core';
import {NgxElectronDataModule} from '@ngx-electron/data';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MatIconModule,
        NgxElectronCoreModule,
        NgxElectronDataModule,
        ValidationMessageRoutingModule,
        TranslateModule,
        MatFormFieldModule,
        MatMenuModule,
        MatTabsModule,
        MatInputModule,
        MatCardModule,
        MatButtonModule
    ],
    declarations: [
        containers,
        components,
        pipes
    ],
    providers: []
})
export class ValidationMessageModule {
}
