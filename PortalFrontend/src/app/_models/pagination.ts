export interface Pagination {
    currantPage: number;
    itemPerPage: number;
    totalItems: number;
    totalPages: number;
}

export class PaginationResult<T>{
    result: T;
    pagination: Pagination;
}
