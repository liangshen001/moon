import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [{
    path: '',
    pathMatch: 'full',
    redirectTo: 'home/chat-list'
}, {
    path: 'auth',
    loadChildren: './modules/auth/auth.module#AuthModule',
}, {
    path: '',
    loadChildren: './modules/main/main.module#MainModule'
}];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
