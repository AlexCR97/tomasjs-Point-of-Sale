import { ProductEntity } from "@/domain/entities";
import { mapper } from "@/infrastructure/mapper";
import { injectable } from "tomasjs";
import { inRepository, Repository } from "tomasjs/mikro-orm/mongodb";
import { ProductDocument } from "../documents";

@injectable()
export class ProductRepo {
  constructor(@inRepository(ProductDocument) private readonly repo: Repository<ProductDocument>) {}

  async createAsync(entity: ProductEntity): Promise<ProductEntity> {
    const document = mapper.map(entity, ProductEntity, ProductDocument);
    await this.repo.persistAndFlush(document);
    return mapper.map(document, ProductDocument, ProductEntity);
  }

  async findAsync(where?: any): Promise<ProductEntity[]> {
    const documents = await this.repo.find(where);
    return mapper.mapArray(documents, ProductDocument, ProductEntity);
  }
}
