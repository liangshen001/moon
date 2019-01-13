import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ValidationMessageIndexComponent} from './containers/index/validation-message-index.component';


const routes: Routes = [{
    path: '',
    component: ValidationMessageIndexComponent
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ValidationMessageRoutingModule {
}
