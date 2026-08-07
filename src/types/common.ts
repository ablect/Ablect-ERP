export interface Pagination {

page: number;

pageSize: number;

total: number;

}

export interface ApiResponse<T> {

success: boolean;

message: string;

data: T;

}