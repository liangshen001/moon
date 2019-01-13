import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule, MatButtonModule, MatCardModule, MatCheckboxModule, MatIconModule, MatInputModule} from '@angular/material';
import {AuthIndexComponent} from './containers/index/auth-index.component';
import {AuthRoutingModule} from './auth-routing.module';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {reducers} from './reducers';
import {AuthLoginComponent} from './components/login/auth-login.component';
import {services} from './services';
import {effects} from './effects';
import {NgxElectronDataModule} from '@ngx-electron/data';
import {NgxElectronCoreModule} from '@ngx-electron/core';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    imports: [
        AuthRoutingModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        MatCheckboxModule,
        MatIconModule,
        MatAutocompleteModule,
        MatCardModule,
        MatInputModule,
        MatButtonModule,

        TranslateModule,
        NgxElectronCoreModule,
        NgxElectronDataModule,
        StoreModule.forFeature('auth', reducers),
        EffectsModule.forFeature(effects)
    ],
    declarations: [
        AuthIndexComponent,
        AuthLoginComponent
    ],
    providers: [...services]
})
export class AuthModule {
}
