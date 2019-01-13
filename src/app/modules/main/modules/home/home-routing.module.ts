import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeChatListComponent} from './containers/chat-list/home-chat-list.component';
import {HomeSearchComponent} from './containers/search/home-search.component';
import {HomeIndexComponent} from './containers/index/home-index.component';

const routes: Routes = [{
    path: '',
    component: HomeIndexComponent,
    children: [{
        path: 'chat-list',
        component: HomeChatListComponent
    }, {
        path: 'search',
        component: HomeSearchComponent
    }/*, {
        path: 'chat-room',
        loadChildren: 'app/modules/main/modules/chat-room/chat-room.module#ChatRoomModule',
        outlet: 'aux'
    }*/]
}/*, {
    path: 'chat-room',
    component: HomeChatRoomComponent,
    // loadChildren: 'app/modules/main/modules/chat-room/chat-room.module#ChatRoomModule',
    outlet: 'aux'
}*/];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule {
}
