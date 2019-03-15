import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {IndexComponent} from './containers/index/index.component';
import {BasicSettingsComponent} from './containers/basic-settings/basic-settings.component';
import {SecuritySettingsComponent} from './containers/security-settings/security-settings.component';
import {PermissionSettingsComponent} from './containers/permission-settings/permission-settings.component';

const routes: Routes = [{
    path: '',
    component: IndexComponent,
    children: [{
        path: '',
        redirectTo: 'basic-settings'
    }, {
        path: 'basic-settings',
        component: BasicSettingsComponent
    }, {
        path: 'security-settings',
        component: SecuritySettingsComponent
    }, {
        path: 'permission-settings',
        component: PermissionSettingsComponent
    }]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SystemSettingsRoutingModule {
}
