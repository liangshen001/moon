import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromRoot from '../../../reducers';
import * as userFromFriend from './user-friend.reducer';
import * as fromFriendMessage from './friend-message.reducer';
import * as fromGroupMessage from './group-message.reducer';
import * as fromGroup from './group.reducer';
import * as fromFriendGroupings from './friend-grouping.reducer';
import * as fromConversation from './conversation.reducer';
import * as fromUser from './user.reducer';
import * as fromGroupGroupings from './group-grouping.reducer';
import {userGroupEntityAdapter, userGroupsReducer, UserGroupsState} from './user-group.reducer';
import {friendValidationAdapter, friendValidationReducer, FriendValidationState} from './friend-validation.reducer';
import {groupSystemMessageAdapter, groupSystemMessageReducer, GroupSystemMessageState} from './group-system-message.reducer';
import {userConfigReducer, UserConfigState} from './user-config.reducer';
import {skinAdapter, skinsReducer, SkinsState} from './skinsReducer';

export interface MainState {
    userFriends: userFromFriend.State;
    groups: fromGroup.State;
    friendMessages: fromFriendMessage.State;
    groupMessages: fromGroupMessage.State;
    friendGroupings: fromFriendGroupings.State;
    conversations: fromConversation.State;
    users: fromUser.State;
    groupGroupings: fromGroupGroupings.State;
    userGroups: UserGroupsState;
    friendValidations: FriendValidationState;
    groupSystemMessages: GroupSystemMessageState;
    userConfig: UserConfigState;
    skins: SkinsState;
}

export interface State extends fromRoot.State {
    main: MainState;
}

export const reducers: ActionReducerMap<MainState> = {
    userFriends: userFromFriend.reducer,
    groups: fromGroup.reducer,
    friendMessages: fromFriendMessage.reducer,
    groupMessages: fromGroupMessage.reducer,
    friendGroupings: fromFriendGroupings.reducer,
    conversations: fromConversation.reducer,
    users: fromUser.reducer,
    groupGroupings: fromGroupGroupings.reducer,
    userGroups: userGroupsReducer,
    friendValidations: friendValidationReducer,
    groupSystemMessages: groupSystemMessageReducer,
    userConfig: userConfigReducer,
    skins: skinsReducer
};

export const getMainState = createFeatureSelector<MainState>('main');

export const getUserFriendState = createSelector(getMainState, state => state.userFriends);

export const getGroupEntitiesState = createSelector(getMainState, state => state.groups);

export const getConversationEntitiesState = createSelector(getMainState, state => state.conversations);

export const getFriendGroupingEntitiesState = createSelector(getMainState, state => state.friendGroupings);

export const getFriendMessageEntitiesState = createSelector(getMainState, state => state.friendMessages);

export const getGroupMessageEntitiesState = createSelector(getMainState, state => state.groupMessages);

export const getUserEntitiesState = createSelector(getMainState, state => state.users);

export const getGroupGroupingEntitiesState = createSelector(getMainState, state => state.groupGroupings);

export const getUserGroupEntitiesState = createSelector(getMainState, state => state.userGroups);

export const getFriendValidationEntitiesState = createSelector(getMainState, state => state.friendValidations);

export const getGroupSystemMessageEntitiesState = createSelector(getMainState, state => state.groupSystemMessages);

export const getUserConfig = createSelector(getMainState, state => state.userConfig);

export const getSkinsState = createSelector(getMainState, state => state.skins);

export const {
    selectIds: getUserFriendIds,
    selectEntities: getUserFriendEntities,
    selectAll: getAllUserFriends,
    selectTotal: getTotalUserFriends,
} = userFromFriend.adapter.getSelectors(getUserFriendState);


export const getUserFriendDragging = createSelector(getUserFriendState, state => state.dragging);

export const {
    selectIds: getGroupIds,
    selectEntities: getGroupEntities,
    selectAll: getAllGroups,
    selectTotal: getTotalGroups,
} = fromGroup.adapter.getSelectors(getGroupEntitiesState);


export const {
    selectIds: getFriendMessageIds,
    selectEntities: getFriendMessageEntities,
    selectAll: getAllFriendMessages,
    selectTotal: getTotalFriendMessages,
} = fromFriendMessage.adapter.getSelectors(getFriendMessageEntitiesState);

export const {
    selectIds: getGroupMessageIds,
    selectEntities: getGroupMessageEntities,
    selectAll: getAllGroupMessages,
    selectTotal: getTotalGroupMessages,
} = fromGroupMessage.adapter.getSelectors(getGroupMessageEntitiesState);


export const {
    selectIds: getFriendGroupingIds,
    selectEntities: getFriendGroupingEntities,
    selectAll: getAllFriendGroupings,
    selectTotal: getTotalFriendGroupings,
} = fromFriendGroupings.adapter.getSelectors(getFriendGroupingEntitiesState);

export const getFriendGroupingDragging = createSelector(getFriendGroupingEntitiesState, state => state.dragging);


export const {
    selectIds: getConversationIds,
    selectEntities: getConversationEntities,
    selectAll: getAllConversations,
    selectTotal: getTotalConversations,
} = fromConversation.adapter.getSelectors(getConversationEntitiesState);

export const {
    selectIds: getUserIds,
    selectEntities: getUserEntities,
    selectAll: getAllUsers,
    selectTotal: getTotalUsers,
} = fromUser.adapter.getSelectors(getUserEntitiesState);

export const {
    selectIds: getGroupGroupingIds,
    selectEntities: getGroupGroupingEntities,
    selectAll: getAllGroupGroupings,
    selectTotal: getTotalGroupGroupings,
} = fromGroupGroupings.adapter.getSelectors(getGroupGroupingEntitiesState);

export const {
    selectIds: getUserGroupIds,
    selectEntities: getUserGroupEntities,
    selectAll: getAllUserGroups,
    selectTotal: getTotalUserGroups,
} = userGroupEntityAdapter.getSelectors(getUserGroupEntitiesState);

export const getUserGroupDragging = createSelector(getUserGroupEntitiesState, state => state.dragging);

export const {
    selectIds: getFriendValidationIds,
    selectEntities: getFriendValidationEntities,
    selectAll: getAllFriendValidations,
    selectTotal: getTotalFriendValidations,
} = friendValidationAdapter.getSelectors(getFriendValidationEntitiesState);

export const {
    selectIds: getGroupSystemMessageIds,
    selectEntities: getGroupSystemMessageEntities,
    selectAll: getAllGroupSystemMessages,
    selectTotal: getTotalGroupSystemMessages,
} = groupSystemMessageAdapter.getSelectors(getGroupSystemMessageEntitiesState);

export const {
    selectIds: getSkinIds,
    selectEntities: getSkinEntities,
    selectAll: getAllSkins,
    selectTotal: getTotalSkins,
} = skinAdapter.getSelectors(getSkinsState);

export const isSkinsInit = createSelector(getSkinsState, state => state.init);






