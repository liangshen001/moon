import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TestIndexComponent} from './containers/index/test-index.component';
import {TestTest1Component} from './components/test1/test-test1.component';
import {TestTest2Component} from './components/test2/test-test2.component';


const routes: Routes = [{
    path: '',
    component: TestIndexComponent,
    children: [
        {
            path: 'test1',
            component: TestTest1Component
        },
        {
            path: 'test2',
            component: TestTest2Component
        }
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TestRoutingModule { }
