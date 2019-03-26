import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {IndexComponent} from './containers/index/index.component';

const routes: Routes = [
    {
        path: ':chatType/:id',
        component: IndexComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateRemarkRoutingModule { }
