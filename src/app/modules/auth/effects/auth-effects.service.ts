import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Database} from '@ngrx/db';
import {catchError, exhaustMap, filter, map, switchMap, take, tap, toArray} from 'rxjs/operators';
import {LoadLoginUsers, LoadLoginUsersSuccess, Login, LoginFailure, LoginUserActionTypes} from '../actions/login-user.actions';
import {LoginUser} from '../models/login-user.model';
import {select, Store} from '@ngrx/store';
import {getLoggingIn} from '../reducers';
import {of} from 'rxjs/internal/observable/of';
import {defer} from 'rxjs/internal/observable/defer';
import {LoginSuccess} from '../../../actions/app.actions';
import {AppService} from '../../../services/app.service';
import {ElectronWindowService} from '../../../services/electron-window.service';

@Injectable()
export class AuthEffects {
    @Effect({ dispatch: false })
    openDB$ = defer(() => this.db.open('moon_app'));

    @Effect()
    loadLocalUsers$ = this.actions$.pipe(
        ofType<LoadLoginUsers>(LoginUserActionTypes.LoadLoginUsers),
        exhaustMap(() => this.db.query('loginUsers').pipe(
            toArray<LoginUser>(),
        )),
        map(loginUsers => new LoadLoginUsersSuccess(loginUsers)),
        catchError(error => of(new LoadLoginUsersSuccess([])))
    );

    @Effect()
    login$ = this.actions$.pipe(
        ofType<Login>(LoginUserActionTypes.Login),
        map(action => action.payload),
        switchMap(loginUser =>
            this.appService.login(loginUser).pipe(
                filter((res: any) => res.success === undefined || res.success
                    || this.store$.dispatch(new LoginFailure(res.message))),
                map(res => res.data),
                switchMap(user =>
                    this.db.insert('loginUsers', [loginUser]).pipe(
                        map(() => user)
                    )),
            )),
        // 判断是否取消登录
        switchMap(user => this.store$.pipe(
            select(getLoggingIn),
            take(1),
            filter(loggingIn => loggingIn),
            map(() => new LoginSuccess(user))
        )),
        tap(loginSuccessAction =>
            this.electronWindowService.openHome('chat-list', loginSuccessAction)
        )
    );
    constructor(private actions$: Actions,
                private store$: Store<any>,
                private db: Database,
                private appService: AppService,
                private electronWindowService: ElectronWindowService) {}
}
