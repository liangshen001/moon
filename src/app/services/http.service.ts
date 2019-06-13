import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {User} from '../models/user.model';
import {HttpClient} from '@angular/common/http';
import {CommonResponseModel} from '../models/common-response.model';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {map, switchMap, take} from 'rxjs/operators';
import {getUser} from '../reducers';
import {HttpParams} from '@angular/common/http/src/params';

/**
 * 对restful api方便使用
 */
@Injectable({
    providedIn: 'root'
})
export class HttpService {

    url = environment.getHttpUrl(`v1/auth`);

    constructor(private http: HttpClient,
                private store$: Store<User>) {
    }

    requestOfParentResource<R>({method, apiBase, resourceName, params, body, resourceId, parentResourceIdObservable, parentResourceName}: {
        method: string;
        apiBase: string;
        resourceName: string;
        params: HttpParams | {
            [param: string]: string | string[];
        };
        body: any;
        resourceId: string | number;
        parentResourceIdObservable: Observable<any>;
        parentResourceName: string;
    }): Observable<R> {
        resourceId = resourceId ? resourceId : '';
        return parentResourceIdObservable.pipe(
            switchMap(parentResourceId =>
                this._request<R>({
                    url: `${apiBase}/${parentResourceName}/${parentResourceId}/${resourceName}/${resourceId}`,
                    method,
                    params,
                    body
                })
            )
        );
    }

    getOfUser<R>({apiBase, resourceName, params, resourceId}: {
        apiBase: string;
        resourceName: string;
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        resourceId?: string | number
    }): Observable<R> {
        return this._requestOfUser({
            method: 'get',
            apiBase,
            resourceName,
            resourceId,
            params
        });
    }

    postOfUser<R>({apiBase, resourceName, body}: {
        apiBase: string;
        resourceName: string;
        body: any;
    }): Observable<R> {
        return this._requestOfUser({
            method: 'post',
            apiBase,
            resourceName,
            body
        });
    }

    patchOfUser<R>({apiBase, resourceName, body, resourceId}: {
        apiBase: string;
        resourceName: string;
        body: any;
        resourceId: string | number;
    }): Observable<R> {
        return this._requestOfUser({
            method: 'patch',
            apiBase,
            resourceName,
            resourceId,
            body
        });
    }

    deleteOfUser<R>({apiBase, resourceName, resourceId}: {
        apiBase: string;
        resourceName: string;
        resourceId: string | number;
    }): Observable<R> {
        return this._requestOfUser({
            method: 'delete',
            apiBase,
            resourceName,
            resourceId,
        });
    }

    get({url, params}: {
        url: string;
        params?: HttpParams | {
            [param: string]: string | string[];
        };
    }) {
        return this._request({
            method: 'get',
            url,
            params
        });
    }

    post({url, body}: {
        url: string;
        body: any;
    }) {
        return this._request({
            method: 'post',
            url,
            body
        });
    }

    delete({url}: {
        url: string;
    }) {
        return this._request({
            method: 'delete',
            url
        });
    }

    patch({url, body}: {
        url: string;
        body: any;
    }) {
        return this._request({
            method: 'patch',
            url,
            body
        });
    }

    private _request<R>({method, url, params, body}: {
        method: string;
        url: string;
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        body?: any;
    }): Observable<R> {
        return this.http.request<CommonResponseModel<R>>(method, environment.getHttpUrl(url), {
            params,
            body,
            withCredentials: true
        }).pipe(
            map(res => res.data)
        );
    }

    private _requestOfUser<R>(options: {
        method: string;
        apiBase: string;
        resourceName: string;
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        resourceId?: string | number;
        body?: any;
    }): Observable<R> {
        return this.requestOfParentResource<R>({
            method: options.method,
            apiBase: options.apiBase,
            resourceName: options.resourceName,
            params: options.params,
            body: options.body,
            resourceId: options.resourceId,
            parentResourceIdObservable: this.store$.pipe(
                select(getUser),
                take(1),
                map(resource => resource.id),
            ),
            parentResourceName: 'users'
        });
    }

}
