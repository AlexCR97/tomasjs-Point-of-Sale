import { BaseEntity } from "@/domain/entities";

export interface Repo<TEntity extends BaseEntity> {
  createAsync(entity: TEntity): Promise<TEntity>;
  deleteAsync(id: string): Promise<void>;
  findAsync(where?: any): Promise<TEntity[]>;
  getAsync(id: string): Promise<TEntity>;
  updateAsync(id: string, entity: Partial<TEntity>): Promise<void>;
}
