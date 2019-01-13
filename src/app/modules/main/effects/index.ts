import {UserFriendEffects} from './user-friend.effects';
import {FriendMessageEffects} from './friend-message.effects';
import {GroupEffects} from './group.effects';
import {GroupMessageEffects} from './group-message.effects';
import {ConversationEffects} from './conversation.effects';
import {FriendGroupingEffects} from './friend-grouping.effects';
import {UserEffect} from './user.effect';
import {GroupGroupingEffect} from './group-grouping.effect';
import {UserGroupEffects} from './user-group.effect';
import {GroupSystemMessageEffects} from './group-system-message.effects';
import {FriendValidationEffects} from './friend-validation.effects';
import {UserConfigEffects} from './user-config.effects';

export const effects = [
    UserFriendEffects,
    FriendMessageEffects,
    GroupEffects,
    GroupMessageEffects,
    FriendGroupingEffects,
    ConversationEffects,
    UserEffect,
    GroupGroupingEffect,
    UserGroupEffects,
    GroupSystemMessageEffects,
    FriendValidationEffects,
    UserConfigEffects
];
