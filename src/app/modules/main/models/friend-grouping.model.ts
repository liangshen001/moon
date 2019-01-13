import {FriendGroupingType} from './friend-grouping-type.enum';
import {GroupingRow} from './grouping-row.model';

export interface FriendGrouping extends GroupingRow {
    id: number;
    type: FriendGroupingType;
    sort: number;

    stealth?: boolean;
    visible?: boolean;
  }
