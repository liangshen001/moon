import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LookupIndexComponent} from './containers/index/lookup-index.component';
import {LookupUserComponent} from './containers/user/lookup-user.component';
import {LookupGroupComponent} from './containers/group/lookup-group.component';


const routes: Routes = [{
    path: '',
    component: LookupIndexComponent,
    children: [{
        path: 'user',
        component: LookupUserComponent
    }, {
        path: 'group',
        component: LookupGroupComponent
    }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LookupRoutingModule { }
