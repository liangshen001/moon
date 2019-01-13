import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppearanceSettingIndexComponent} from './containers/index/appearance-setting-index.component';
import {AppearanceSettingSkinSettingComponent} from './containers/skin-setting/appearance-setting-skin-setting.component';
import {AppearanceSettingColourfulBubbleComponent} from './containers/colourful-bubble/appearance-setting-colourful-bubble.component';


const routes: Routes = [{
    path: '',
    component: AppearanceSettingIndexComponent,
    children: [{
        path: 'skin-setting',
        component: AppearanceSettingSkinSettingComponent
    }, {
        path: 'colourful-bubble',
        component: AppearanceSettingColourfulBubbleComponent
    }]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AppearanceSettingRoutingModule { }
