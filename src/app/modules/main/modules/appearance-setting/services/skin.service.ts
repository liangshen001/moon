import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '../../../../../../environments/environment';
import {CommonResponseModel} from '../../../../../models/common-response.model';
import {Skin} from '../../../models/skin';

@Injectable()
export class SkinService {
    url = environment.getHttpUrl('v1/skins');
    constructor(private http: HttpClient) {
    }

    load() {
        return this.http.get<CommonResponseModel<Skin[]>>(this.url, {withCredentials: true})
            .pipe(map(res => res.data));
    }
}