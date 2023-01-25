import { BaseEntity } from "@/domain/entities";
import { mapper } from "@/infrastructure/mapper";
import { ObjectId } from "@mikro-orm/mongodb";
import { ClassConstructor } from "tomasjs/container";
import { Repository } from "tomasjs/mikro-orm/mongodb";
import { BaseDocument } from "../../documents";
import { Repo } from "./Repo";

export abstract class BaseRepo<TEntity extends BaseEntity, TDocument extends BaseDocument>
  implements Repo<TEntity>
{
  constructor(
    protected readonly entityConstructor: ClassConstructor<TEntity>,
    protected readonly documentConstructor: ClassConstructor<TDocument>,
    protected readonly repo: Repository<TDocument>
  ) {}

  async createAsync(entity: TEntity): Promise<TEntity> {
    const document = mapper.map(entity, this.entityConstructor, this.documentConstructor);
    await this.repo.persistAndFlush(document);
    return mapper.map(document, this.documentConstructor, this.entityConstructor);
  }

  async deleteAsync(id: string): Promise<void> {
    const document = await this.repo.findOneOrFail(id as any);
    await this.repo.removeAndFlush(document);
  }

  async findAsync(where?: any): Promise<TEntity[]> {
    const documents = await this.repo.find(where);
    return mapper.mapArray(documents, this.documentConstructor, this.entityConstructor);
  }

  async getAsync(id: string): Promise<TEntity> {
    const document = await this.repo.findOneOrFail(id as any);
    return mapper.map(document, this.documentConstructor, this.entityConstructor);
  }

  async updateAsync(id: string, entity: Partial<TEntity>): Promise<void> {
    const existingDocument = await this.repo.findOneOrFail(id as any);
    const updateDocument = mapper.map(entity, this.entityConstructor, this.documentConstructor);
    updateDocument._id = ObjectId.createFromHexString(id);
    updateDocument.createdAt = existingDocument.createdAt;
    updateDocument.createdBy = existingDocument.createdBy;
    this.repo.assign(existingDocument, updateDocument);
    await this.repo.flush();
  }
}
