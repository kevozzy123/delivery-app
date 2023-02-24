export interface User {
    id: number,
    username: string,
    email: string,
    token: string
}

export interface IPropOptions {
    [key: string]: any
}

export interface IQueryOptions {
    lazy?: boolean,
    cachePolicy?: 'cache-first' | 'no-cache' | 'cache-only'
}

export interface IApiState {
    data: any | null,
    error: any | null,
    isLoading: boolean,
    variables: object
}