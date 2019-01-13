import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {UpdateUserConfig} from '../../../../actions/user-config.actions';
import {MatSliderChange} from '@angular/material';
import {getUserConfig, getAllSkins} from '../../../../reducers';
import {debounceTime} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {UserConfig} from '../../../../models/user-config';
import {NgxElectronDataService} from '@ngx-electron/data';
import {Skin} from '../../../../models/skin';

@Component({
    selector: 'app-appearance-setting-skin-setting',
    templateUrl: 'appearance-setting-skin-setting.component.html',
    styleUrls: ['appearance-setting-skin-setting.component.scss']
})
export class AppearanceSettingSkinSettingComponent implements OnInit {

    colors: string[];
    skins$: Observable<Skin[]>;
    userConfig$: Observable<UserConfig>;

    customColorSubject: Subject<string>;

    constructor(private electronStoreService: NgxElectronDataService,
                private store$: Store<any>) {
    }

    ngOnInit() {
        this.colors = ['#009BDB', '#288ADD', '#31A66B', '#DA434E', '#E56281', '#B1639F',
            '#6B51CD', '#595CA0', '#3074C1', '#00829A', '#195C77', '#4FB0AC', '#7AC5C4',
            '#9BB7D6', '#804D4D', '#F0BC59', '#CFBAAA'];
        this.userConfig$ = this.store$.pipe(
            select(getUserConfig)
        );
        this.skins$ = this.store$.pipe(
            select(getAllSkins)
        );
        this.customColorSubject = new Subject<string>();
        this.customColorSubject.pipe(
            debounceTime(300)
        ).subscribe(color => this.changeBackground(color));
    }

    changeBackground(background: string) {
        this.electronStoreService.dispatch(new UpdateUserConfig({
            background
        }));
    }
    changeBackgroundImage(url: string) {
        this.changeBackground(`url(${url}) no-repeat`);
    }

    changeOpacity(event: MatSliderChange) {
        this.electronStoreService.dispatch(new UpdateUserConfig({
            opacity: event.value
        }));
    }

    sliderChange(event) {
        this.customColorSubject.next(event.color);
    }
}
