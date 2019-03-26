import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UpdateRemarkRoutingModule} from './update-remark-routing.module';
import {IndexComponent} from './containers/index/index.component';
import {NgxElectronCoreModule} from '@ngx-electron/core';
import {NgxElectronDataModule} from '@ngx-electron/data';
import {MatButtonModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
    declarations: [IndexComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        UpdateRemarkRoutingModule,
        NgxElectronCoreModule,
        NgxElectronDataModule,

        MatButtonModule,
        MatInputModule,
        MatFormFieldModule
    ]
})
export class UpdateRemarkModule {
}
