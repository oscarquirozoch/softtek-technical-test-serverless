export interface BaseRepository<T> {
    show(id: any): Promise<T>;
    get(): Promise<T[]>;
    create(data: T): Promise<T>;
    update(id: any, data: T): Promise<T>;
    delete(id: any): Promise<T>;
}