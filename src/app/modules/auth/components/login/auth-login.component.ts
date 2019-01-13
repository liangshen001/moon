import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {LoginUser} from '../../models/login-user.model';
import {select, Store} from '@ngrx/store';
import {CancelLogin, Login} from '../../actions/login-user.actions';
import {getLoggingIn} from '../../reducers';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs/internal/Observable';
import {filter, startWith} from 'rxjs/operators';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-auth-login',
    templateUrl: './auth-login.component.html',
    styleUrls: ['./auth-login.component.scss'],
    animations: [
        trigger('imgTrigger', [
            state('login', style({
                'top': '35%',
                'width': '0',
                'height': '0'
            })),
            state('logining', style({
                'top': '20%',
                'width': '100px',
                'height': '100px'
            })),
            transition('* => *', animate(500))
        ]),
        trigger('formTrigger', [
            state('login', style({
                'opacity': '1'
            })),
            state('logining', style({
                'opacity': '0'
            })),
            transition('* => *', animate(500))
        ]),
    ]
})
export class AuthLoginComponent implements OnInit, OnDestroy {

    @Input()
    loginUsers: LoginUser[];

    @Input()
    loginForm: FormGroup;

    @Input()
    errorMessage: string | null;
    @Output()
    submitted = new EventEmitter<LoginUser>();

    // 是否正在登录
    isLogining$: Observable<boolean>;
    filteLoginUsers: LoginUser[];


    autoLoginAsTrueSubscription: Subscription;
    rememberPasswordSubscription: Subscription;
    accountSubscription: Subscription;
    constructor(private store$: Store<any>) {}

    ngOnInit(): void {
        this.isLogining$ = this.store$.pipe(select(getLoggingIn));

        this.accountSubscription = this.loginForm.get('account').valueChanges.pipe(
            startWith('')
        ).subscribe(value => {
            this.filteLoginUsers = this.loginUsers.filter(
                user => value ? user.account.includes(value) : true).slice(0, 4);
        });
        // 自动登录和保存密码联动关系
        this.autoLoginAsTrueSubscription = this.loginForm.get('autoLogin').valueChanges.pipe(
            filter(value => value),
        ).subscribe(value => this.loginForm.get('rememberPassword').setValue(value));
        this.rememberPasswordSubscription = this.loginForm.get('rememberPassword').valueChanges.pipe(
            filter(value => !value),
        ).subscribe(value => this.loginForm.get('autoLogin').setValue(value));

    }

    cancel(): void {
        this.store$.dispatch(new CancelLogin());
    }


    submit() {
        if (this.loginForm.valid) {
            this.store$.dispatch(new Login(this.loginForm.value));
        }
    }

    ngOnDestroy(): void {
        this.autoLoginAsTrueSubscription.unsubscribe();
        this.rememberPasswordSubscription.unsubscribe();
        this.accountSubscription.unsubscribe();
    }

    selectLoginUser(selectLoginUser: LoginUser) {
        this.loginForm.get('password').setValue(selectLoginUser.password);
        this.loginForm.get('rememberPassword').setValue(selectLoginUser.rememberPassword);
        this.loginForm.get('autoLogin').setValue(selectLoginUser.autoLogin);
    }

    openSettingPage(): void {

    }

}
