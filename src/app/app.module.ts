import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {StoreModule} from '@ngrx/store';
import {metaReducers, reducers} from './reducers';
import {EffectsModule} from '@ngrx/effects';
import {DBModule} from '@ngrx/db';
import {schema} from './db';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {environment} from '../environments/environment';
import {InMemoryWebApiModule} from 'angular-in-memory-web-api';
import {InMemoryDateService} from './in-memory-date.service';
import {effects} from './effects';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxElectronCoreModule, NgxElectronService} from '@ngx-electron/core';
import {NgxElectronDataModule} from '@ngx-electron/data';

// 加载翻译文件 需要判断当前是否以服务的方式加载页面, 使用angular-in-memory-web-api注意处理一下请求
export function HttpLoaderFactory(http: HttpClient, electronService: NgxElectronService) {
    let prefix;
    if (electronService.isServer()) {
        prefix = `http://${electronService.getHost()}:${electronService.getPort()}/assets/i18n/`;
    } else {
        prefix = './assets/i18n/';
    }
    return new TranslateHttpLoader(http, prefix, '.json');
}

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        StoreModule.forRoot(reducers, {metaReducers}),
        EffectsModule.forRoot(effects),
        NgxElectronCoreModule.forRoot(),
        NgxElectronDataModule.forRoot(),
        DBModule.provideDB(schema),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (HttpLoaderFactory),
                deps: [HttpClient, NgxElectronService]
            }
        }),
        ...((environment.production) ? [] : [
            InMemoryWebApiModule.forRoot(InMemoryDateService, {
                delay: 0,
                dataEncapsulation: true
            })
        ])
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
