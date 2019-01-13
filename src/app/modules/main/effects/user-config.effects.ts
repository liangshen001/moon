import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {select, Store} from '@ngrx/store';
import {filter, map, switchMap, take} from 'rxjs/operators';
import {getUserConfig, MainState} from '../reducers';
import {UserConfigService} from '../services/user-config.service';
import {LoadUserConfig, LoadUserConfigSuccess, UpdateUserConfig, UserConfigActionTypes} from '../actions/user-config.actions';
import {getUser} from '../../../reducers';


@Injectable()
export class UserConfigEffects {

    @Effect()
    loadUserConfig$ = this.actions$.pipe(
        ofType<LoadUserConfig>(UserConfigActionTypes.LoadUserConfig),
        switchMap(() => this.store$.pipe(
            select(getUser),
            filter(user => !!user),
            take(1),
            map(user => user.userConfigId)
        )),
        switchMap(userConfigId => this.userConfigService.loadUserConfig(userConfigId)),
        map(userConfig => new LoadUserConfigSuccess(userConfig))
    );

    @Effect({dispatch: false})
    updateUserConfig$ = this.actions$.pipe(
        ofType<UpdateUserConfig>(UserConfigActionTypes.UpdateUserConfig),
        map(action => action.payload),
        switchMap(param => this.store$.pipe(
            select(getUserConfig),
            filter(userConfig => !!userConfig),
            take(1),
            map(userConfig => userConfig.id),
            switchMap(userConfigId => this.userConfigService.updateUserConfig(userConfigId, param))
        )),
    );


    constructor(
        private store$: Store<MainState>,
        private actions$: Actions,
        private userConfigService: UserConfigService
    ) {}
}
