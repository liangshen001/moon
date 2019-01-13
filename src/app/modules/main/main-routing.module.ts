import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainIndexComponent} from './containers/index/main-index.component';


const routes: Routes = [{
    path: '',
    component: MainIndexComponent,
    // canActivate: [AuthGuard],
    children: [{
        path: 'home',
        loadChildren: './modules/home/home.module#HomeModule'
    }, {
        path: 'chat-room',
        loadChildren: './modules/chat-room/chat-room.module#ChatRoomModule'
    }, {
        path: 'lookup',
        loadChildren: './modules/lookup/lookup.module#LookupModule'
    }, {
        path: 'validation-message',
        loadChildren: './modules/validation-message/validation-message.module#ValidationMessageModule'
    }, {
        path: 'appearance-setting',
        loadChildren: './modules/appearance-setting/appearance-setting.module#AppearanceSettingModule'
    }, {
        path: 'create-group',
        loadChildren: './modules/create-group/create-group.module#CreateGroupModule'
    }]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainRoutingModule { }

