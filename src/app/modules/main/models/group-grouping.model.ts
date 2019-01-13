import {GroupingRow} from './grouping-row.model';

export interface GroupGrouping extends GroupingRow {
    id: number;
    system?: boolean;
    sort: number;
}
