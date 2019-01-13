export class Page<T> {
    constructor(public list: T[],
                public currentPage: number,
                public totalPage: number) {}
}