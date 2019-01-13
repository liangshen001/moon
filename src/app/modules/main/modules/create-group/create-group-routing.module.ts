import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CreateGroupIndexComponent} from './containers/index/create-group-index.component';
import {CreateGroupCategoriesComponent} from './containers/categories/create-group-categories.component';
import {CreateGroupFormComponent} from './containers/form/create-group-form.component';
import {CreateGroupInviteComponent} from './containers/invite/create-group-invite.component';

const routes: Routes = [{
    path: '',
    component: CreateGroupIndexComponent,
    children: [{
        path: 'categories',
        component: CreateGroupCategoriesComponent
    }, {
        path: 'form/:createGroupType',
        component: CreateGroupFormComponent
    }, {
        path: 'invite/:groupId',
        component: CreateGroupInviteComponent
    }]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CreateGroupRoutingModule {
}
