import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CommonResponseModel} from '../../../models/common-response.model';
import {GroupGrouping} from '../models/group-grouping.model';
import {environment} from '../../../../environments/environment';
import {map} from 'rxjs/operators';
import {HttpService} from '../../../services/http.service';

@Injectable()
export class GroupGroupingService {

    constructor(private http: HttpService) {}

    findGroupGroupings() {
        return this.http.getOfUser({
            apiBase: 'v1',
            resourceName: 'groupGroupings'
        });
    }

    renameGroupGrouping(resourceId: number, name: string) {
        return this.http.patchOfUser({
            apiBase: 'v1',
            resourceName: 'groupGroupings',
            resourceId,
            body: {name}
        });
    }

    addGroupGrouping(name: string) {
        return this.http.postOfUser({
            apiBase: 'v1',
            resourceName: 'groupGroupings',
            body: {name}
        });
    }

    deleteGroupGrouping(resourceId: any) {
        return this.http.deleteOfUser({
            apiBase: 'v1',
            resourceName: 'groupGroupings',
            resourceId
        });
    }
}