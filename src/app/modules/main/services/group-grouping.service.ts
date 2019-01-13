import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CommonResponseModel} from '../../../models/common-response.model';
import {GroupGrouping} from '../models/group-grouping.model';
import {environment} from '../../../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable()
export class GroupGroupingService {

    constructor(private http: HttpClient) {}

    findGroupGroupings() {
        return this.http.get<CommonResponseModel<GroupGrouping[]>>(environment.getHttpUrl(`v1/groupGroupings`), {withCredentials: true});
    }

    renameGroupGrouping(id: number, name: string) {
        return this.http.patch<CommonResponseModel<GroupGrouping>>(
            environment.getHttpUrl(`v1/groupGroupings/${id}`), {
                name
            }, {withCredentials: true});
    }

    addGroupGrouping(name: string) {
        return this.http.post<CommonResponseModel<GroupGrouping>>(
            environment.getHttpUrl(`v1/groupGroupings`), {
                name
            }, {withCredentials: true}).pipe(map(res => res.data));
    }

    deleteGroupGrouping(id: any) {
        return this.http.delete<CommonResponseModel<GroupGrouping>>(
            environment.getHttpUrl(`v1/groupGroupings/${id}`), {withCredentials: true}).pipe(map(res => res.data));
    }
}