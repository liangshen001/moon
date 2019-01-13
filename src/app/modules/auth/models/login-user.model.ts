import {OnlineStatus} from "../../../enums/online-status";


export class LoginUser {
    constructor(public account: string,
                public password: string,
                public onlineStatus?: OnlineStatus,
                public rememberPassword?: boolean,
                public autoLogin?: boolean
    ) {}
}
