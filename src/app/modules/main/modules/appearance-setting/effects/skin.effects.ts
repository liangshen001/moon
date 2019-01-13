import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {map, switchMap, tap} from 'rxjs/operators';
import {LoadSkins, LoadSkinsSuccess, SkinActionTypes} from '../../../actions/skin.actions';
import {SkinService} from '../services/skin.service';
import {NgxElectronDataService} from '@ngx-electron/data';

@Injectable()
export class SkinEffects {
    constructor(private actions$: Actions,
                private skinService: SkinService,
                private electronStoreService: NgxElectronDataService) {}
    @Effect({dispatch: false})
    loadUsersSuccess$ = this.actions$.pipe(
        ofType<LoadSkins>(SkinActionTypes.LoadSkins),
        switchMap(() => this.skinService.load()),
        tap(skins => this.electronStoreService.dispatch(new LoadSkinsSuccess(skins)))
    );
}
