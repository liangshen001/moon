import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthIndexComponent} from './containers/index/auth-index.component';


const routes: Routes = [{
    path: '',
    component: AuthIndexComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
