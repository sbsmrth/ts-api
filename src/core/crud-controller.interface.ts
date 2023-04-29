export interface CrudController<T> {
    findAll(): T[];
    findOne(id: string): T | null;
    create(item: T): T;
    update(id: string, item: T): void;
    delete(id: string): void;
}