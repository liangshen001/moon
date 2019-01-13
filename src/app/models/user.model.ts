import {OnlineStatus} from '../enums/online-status';

export interface User {
    id: number;
    name: string;
    imageUrl: string;
    onlineStatus: OnlineStatus;
    saying?: string;
    phone?: number;
    email?: string;
    sex?: boolean;
    theme?: string;
    lv?: number;
    userConfigId?: number;
    loadInfo?: boolean;
  }
