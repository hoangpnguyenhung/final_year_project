import { BaseEntity, EntitySchema, Repository } from "typeorm";

export class BaseRepository<T extends BaseEntity, R extends Repository<T>> {
    
}