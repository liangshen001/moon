export interface Group {
    id: number;
    name: string;
    imageUrl: string;
    ownerId: number;
    createTime?: number;
    des?: string;
    theme?: string;

    loadInfo?: boolean;
  }
