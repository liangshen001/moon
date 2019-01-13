import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatBadgeModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule
} from '@angular/material';
import {CommonModule} from '@angular/common';
import {NgxElectronCoreModule} from '@ngx-electron/core';
import {NgxElectronDataModule} from '@ngx-electron/data';
import {CreateGroupRoutingModule} from './create-group-routing.module';
import {containers} from './containers';
import {services} from './services';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {components} from './components';
import {NgxRowModule} from 'ngx-row';
import {pipes} from './pipes';
import {NgxMatDynamicFormModule} from 'ngx-mat-dynamic-form';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        MatFormFieldModule,
        MatRadioModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatSelectModule,
        MatBadgeModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatGridListModule,

        TranslateModule,
        NgxElectronCoreModule,
        NgxElectronDataModule,
        NgxRowModule,
        NgxMatDynamicFormModule,
        CreateGroupRoutingModule
    ],
    providers: services,
    declarations: [
        ...containers,
        ...components,
        ...pipes
    ]
})
export class CreateGroupModule {
}
