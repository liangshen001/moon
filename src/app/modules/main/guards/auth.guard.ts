import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../../reducers/app.reducer';
import {getLoggedIn} from '../../../reducers';
import {map, take} from 'rxjs/operators';
import {LoginRedirect} from '../../../actions/app.actions';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private store$: Store<AppState>) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.store$.pipe(
            select(getLoggedIn),
            map(authed => {
                if (!authed) {
                    this.store$.dispatch(new LoginRedirect());
                    return false;
                }
                return true;
            }),
            take(1)
        );
    }

}
