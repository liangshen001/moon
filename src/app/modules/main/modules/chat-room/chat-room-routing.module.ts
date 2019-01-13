import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ChatRoomGroupComponent} from './containers/group/chat-room-group.component';
import {ChatRoomPrivateComponent} from './containers/friend/chat-room-private.component';
import {ChatRoomIndexComponent} from './containers/index/chat-room-index.component';

const routes: Routes = [{
    path: '',
    component: ChatRoomIndexComponent,
    children: [{
        path: 'group/:groupId',
        component: ChatRoomGroupComponent
    }, {
        path: 'friend/:friendId',
        component: ChatRoomPrivateComponent
    }]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ChatRoomRoutingModule {
}
