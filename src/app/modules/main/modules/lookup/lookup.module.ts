import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule} from '@angular/material';
import {LookupIndexComponent} from './containers/index/lookup-index.component';
import {LookupUserComponent} from './containers/user/lookup-user.component';
import {LookupGroupComponent} from './containers/group/lookup-group.component';
import {LookupService} from './lookup.service';
import {LookupRoutingModule} from './lookup-routing.module';
import {NgxElectronDataModule} from '@ngx-electron/data';
import {NgxElectronCoreModule} from '@ngx-electron/core';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MatIconModule,
        NgxElectronCoreModule,
        NgxElectronDataModule,
        LookupRoutingModule,
        TranslateModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule
    ],
    declarations: [
        LookupIndexComponent,
        LookupUserComponent,
        LookupGroupComponent
    ],
    providers: [LookupService]
})
export class LookupModule {
}
