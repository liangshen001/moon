export interface UserFriend {
    id: number;
    friendGroupingId: number;
    friendId: number;
    stealth?: boolean;
    shield?: boolean;
    visible?: boolean;
    remark?: string;
}
