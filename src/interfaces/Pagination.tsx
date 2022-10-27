export interface Pagination{
    lastPage: number;
    page: number;
    perPage: number;
    total: number;
    nextPage: number | null;
}