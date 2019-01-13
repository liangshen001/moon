import {Action} from '@ngrx/store';
import {Skin} from '../models/skin';

export enum SkinActionTypes {
    LoadSkinsSuccess = '[Skin] LoadSkinsSuccess',
    LoadSkins = '[Skin] LoadSkins'
}
export class LoadSkinsSuccess implements Action {
    readonly type = SkinActionTypes.LoadSkinsSuccess;
    constructor(public payload: Skin[]) {}
}
export class LoadSkins implements Action {
    readonly type = SkinActionTypes.LoadSkins;
}

export type SkinAction = LoadSkinsSuccess | LoadSkins;
