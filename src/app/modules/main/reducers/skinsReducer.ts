import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Skin} from '../models/skin';
import {SkinAction, SkinActionTypes} from '../actions/skin.actions';


export interface SkinsState extends EntityState<Skin> {
    init: boolean;
}

export const skinAdapter: EntityAdapter<Skin> = createEntityAdapter<Skin>({
    selectId: (skin: Skin) => skin.id,
    sortComparer: (skin1, skin2) => skin2.sort - skin1.sort
});


export const initialState: SkinsState = skinAdapter.getInitialState({
    init: false
});

export function skinsReducer(
    state: SkinsState = initialState,
    action: SkinAction
): SkinsState {
    switch (action.type) {
        case SkinActionTypes.LoadSkinsSuccess:
            return skinAdapter.addMany(action.payload, state);
        default:
            return state;
    }
}

