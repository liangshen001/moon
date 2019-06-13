import {InMemoryDateService} from './in-memory-date.service';
import {getStatusText, ParsedRequestUrl, RequestInfo, RequestInfoUtilities, ResponseOptions, STATUS} from 'angular-in-memory-web-api';
import {HttpRequest} from '@angular/common/http';

export class InMemoryDataOverrideService extends InMemoryDateService {

    /**
     *
     */
    genId<T extends { id: any }>(collection: T[], collectionName: string): any {
        if (collection) {
            console.log(`genId override for '${collectionName}'`);
            return 1 + collection.reduce((prev, curr) => Math.max(prev, curr.id || 0), 1000);
        }
        return null;
    }

    parseRequestUrl(url: string, utils: RequestInfoUtilities): ParsedRequestUrl {
        let newUrl;
        if (url.includes('assets')) {
            newUrl = url;
        } else {
            const urls = url.split('/').filter(u => u);
            if (urls.length < 2) {
                throw new Error(`${url}没有apiBase`);
            } else if (urls.length > 5) {
                throw new Error(`${url}路径太多`);
            } else if (urls.length > 3) {
                urls.splice(1, 2);
                newUrl = urls.join('/');
            } else {
                newUrl = url;
            }
        }
        const parsed = utils.parseRequestUrl(newUrl);
        console.log(`parseRequestUrl override of '${url}':`, parsed);
        return parsed;
    }

    // HTTP GET interceptor
    get(reqInfo: RequestInfo) {
        const collectionName = reqInfo.collectionName;
        if (collectionName === 'userConfigs') {
            return this.getUserConfigs(reqInfo);
        } else if (collectionName === 'i18n' || collectionName === 'assets') {
            return this.getI18nJson(reqInfo);
        }
        return undefined; // let the default GET handle all others
    }

    post(reqInfo: RequestInfo) {
        if (reqInfo.collectionName === 'auth') {
            return reqInfo.utils.createResponse$(() => {
                console.log('HTTP GET override');
                const dataEncapsulation = reqInfo.utils.getConfig().dataEncapsulation;
                const data = this.users[0];
                const options: ResponseOptions = {
                    body: dataEncapsulation ? {data} : data,
                    status: STATUS.OK
                };
                return this.finishOptions(options, reqInfo);
            });
        } else if (reqInfo.collectionName === 'friendMessages' ||
            reqInfo.collectionName === 'groupMessages') {
            return reqInfo.utils.createResponse$(() => {
                const dataEncapsulation = reqInfo.utils.getConfig().dataEncapsulation;
                const data = {
                    id: new Date().getTime(),
                    senderId: 1,
                    sendTime: new Date().getTime()
                };
                const options: ResponseOptions = {
                    body: dataEncapsulation ? {data} : data,
                    status: STATUS.OK
                };
                return this.finishOptions(options, reqInfo);
            });
        } else if (reqInfo.collectionName === 'groups') {
            return reqInfo.utils.createResponse$(() => {
                const dataEncapsulation = reqInfo.utils.getConfig().dataEncapsulation;
                const data = {
                    id: new Date().getTime(),
                    ownerId: 1,
                    createTime: new Date().getTime(),
                    ...(<HttpRequest<any>> reqInfo.req).body.params
                };
                const options: ResponseOptions = {
                    body: dataEncapsulation ? {data} : data,
                    status: STATUS.OK
                };
                return this.finishOptions(options, reqInfo);
            });
        }
        return undefined;
    }

    put(reqInfo: RequestInfo) {
        return reqInfo.utils.createResponse$(() => {
            const dataEncapsulation = reqInfo.utils.getConfig().dataEncapsulation;
            let data = reqInfo.collection.find(d => d.id === reqInfo.id);
            data = {...data, ...(reqInfo.req as any).body};
            return {
                body: dataEncapsulation ? {data} : data,
                status: STATUS.OK
            };
        });
    }

    patch(reqInfo: RequestInfo) {
        return reqInfo.utils.createResponse$(() => {
            const dataEncapsulation = reqInfo.utils.getConfig().dataEncapsulation;
            let data = reqInfo.collection.find(d => d.id === reqInfo.id);
            data = {...data, ...(reqInfo.req as any).body};
            return {
                body: dataEncapsulation ? {data} : data,
                status: STATUS.OK
            };
        });
    }

    delete(reqInfo: RequestInfo) {
        return reqInfo.utils.createResponse$(() => {
            const dataEncapsulation = reqInfo.utils.getConfig().dataEncapsulation;
            let data = reqInfo.collection.find(d => d.id === reqInfo.id);
            data = {...data, ...(reqInfo.req as any).body};
            return {
                body: dataEncapsulation ? {data} : data,
                status: STATUS.OK
            };
        });
    }

    responseInterceptor(resOptions: ResponseOptions, reqInfo: RequestInfo) {
        resOptions.headers.set('x-test', 'dev-header');
        const method = reqInfo.method.toUpperCase();
        const body = JSON.stringify(resOptions);
        console.log(`responseInterceptor: ${method} ${reqInfo.req.url}: \n${body}`);
        return resOptions;
    }

    private getUserConfigs(reqInfo: RequestInfo) {
        return reqInfo.utils.createResponse$(() => {
            const data = this.userConfigs[0];
            const dataEncapsulation = reqInfo.utils.getConfig().dataEncapsulation;
            console.log(reqInfo);
            const options: ResponseOptions = {
                body: dataEncapsulation ? {data} : data,
                status: STATUS.OK
            };
            return this.finishOptions(options, reqInfo);
        });
    }


    private getI18nJson(reqInfo: RequestInfo) {
        return reqInfo.utils.createResponse$(() => {
            const oReq = new XMLHttpRequest();
            console.log(`请求地址：${reqInfo.url}`);
            oReq.open('GET', reqInfo.url, false); // 同步请求
            oReq.send(null);
            const data = JSON.parse(oReq.responseText);
            console.log(`请求i18n:`);
            console.log(data);
            const dataEncapsulation = reqInfo.utils.getConfig().dataEncapsulation;
            const options: ResponseOptions = {
                body: data,
                status: STATUS.OK
            };
            return this.finishOptions(options, reqInfo);
        });
    }
    // HTTP GET interceptor handles requests for villains
    private getVillains(reqInfo: RequestInfo) {
        return reqInfo.utils.createResponse$(() => {
            console.log('HTTP GET override');
            const collection = [].slice();
            const dataEncapsulation = reqInfo.utils.getConfig().dataEncapsulation;
            const id = reqInfo.id;
            // tslint:disable-next-line:triple-equals
            const data = id == undefined ? collection : reqInfo.utils.findById(collection, id);
            const options: ResponseOptions = data ?
                {
                    body: dataEncapsulation ? {data} : data,
                    status: STATUS.OK
                } : {
                    body: {error: `'Villains' with id='${id}' not found`},
                    status: STATUS.NOT_FOUND
                };
            return this.finishOptions(options, reqInfo);
        });
    }

    private finishOptions(options: ResponseOptions, {headers, url}: RequestInfo) {
        options.statusText = getStatusText(options.status);
        options.headers = headers;
        options.url = url;
        return options;
    }
}