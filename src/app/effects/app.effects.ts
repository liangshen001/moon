import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Database} from '@ngrx/db';
import {AppActionTypes} from '../actions/app.actions';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {AppService} from '../services/app.service';

@Injectable()
export class AppEffects {

    @Effect({ dispatch: false })
    loginRedirect$ = this.actions$.pipe(
        ofType(AppActionTypes.LoginRedirect, AppActionTypes.Logout),
        tap(() => {
            this.router.navigate(['/login']);
        })
    );

    // @Effect({ dispatch: false })
    // changeOnlineStatus$ = this.actions$.pipe(
    //     ofType<ChangeOnlineStatus>(AppActionTypes.ChangeOnlineStatus),
    //     map(action => action.payload),
    //     switchMap(onlineStatus => this.appService.changeOnlineStatus(onlineStatus))
    // );
    //
    // @Effect({ dispatch: false })
    // editSaying$ = this.actions$.pipe(
    //     ofType<EditSaying>(AppActionTypes.EditSaying),
    //     map(action => action.payload),
    //     switchMap(saying => this.appService.changeSaying(saying))
    // );



    constructor(private actions$: Actions,
                private db: Database,
                private router: Router,
                private appService: AppService) {}
}
