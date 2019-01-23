import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {OnlineStatus} from '../../../../enums/online-status';
import {select, Store} from '@ngrx/store';
import {LoadLoginUsers, Login} from '../../actions/login-user.actions';
import {LoginUser} from '../../models/login-user.model';
import {FormControl, FormGroup} from '@angular/forms';
import {getAllLoginUsers} from '../../reducers';
import {Observable} from 'rxjs';
import {NgxElectronService} from '@ngx-electron/core';
import {ElectronWindowService} from '../../../../services/electron-window.service';

@Component({
    selector: 'app-auth-index',
    templateUrl: './auth-index.component.html',
    styleUrls: ['./auth-index.component.scss']
})
export class AuthIndexComponent implements OnInit {


    loginUser: LoginUser = new LoginUser('', '',
        OnlineStatus.OFFLINE, false, false);

    password: string;

    username: string;

    onlineStatus: OnlineStatus;

    // 是否打开设置页
    isOpenSettingPage: boolean;

    // 过渡是否打开设置页
    isOpenSettingPageTransitionend: boolean;

    loginForm = new FormGroup({
        account: new FormControl(''),
        password: new FormControl(''),
        rememberPassword: new FormControl(false),
        autoLogin: new FormControl(false)
    });
    loginUsers$: Observable<LoginUser[]>;
    electron: boolean;

    constructor(private windowControlService: ElectronWindowService,
                private store$: Store<any>,
                private electronService: NgxElectronService) {}

    ngOnInit() {
        this.electron = this.electronService.isElectron();
        this.store$.dispatch(new LoadLoginUsers());
        this.loginUsers$ = this.store$.pipe(select(getAllLoginUsers));
        this.windowControlService.initLoginTray();

        this.password = 'xiaoming';
        this.username = 'xiaoming';
        this.onlineStatus = OnlineStatus.ONLINE;
    }

    checkForUpdates() {
        console.log('*********************');
        // this.windowControlService.checkForUpdates();
    }

    downloadUpdate() {
        // this.windowControlService.downloadUpdate();
    }

    quitAndInstall() {
        // this.windowControlService.quitAndInstall();
    }

    login(): void {
        // if (this.username == 'c') {
        //   this.electronServer.checkForUpdates();
        // } else if (this.username == 'd') {
        //   this.electronServer.downloadUpdate();
        // } else if (this.username == 'i') {
        //   this.electronServer.quitAndInstall();
        // }
        // if (this.username) {
        //   return;
        // }
        if (!this.username) {
            console.log('username 不能为空');
            return;
        } else if (!this.password) {
            console.log('password 不能为空');
            return;
        }

        this.store$.dispatch(new Login(this.loginUser));

        // this.userService.login(this.username, this.password, this.onlineStatus).subscribe(res => {
        //     console.log(`...........${JSON.stringify(res)}`);
        //     const win: Electron.BrowserWindow = this.windowControlService.openHomeWindow();
        //     // this.windowControlService.closeCurrentWindow();
        // });
    }

    openSettingPage() {
        this.isOpenSettingPage = true;
    }

    returnLoginPage() {
        this.isOpenSettingPage = false;
    }
}
