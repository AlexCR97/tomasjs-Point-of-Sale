import { ProductEntity } from "@/domain/entities";
import { injectable } from "tomasjs";
import { inRepository, Repository } from "tomasjs/mikro-orm/mongodb";
import { ProductDocument } from "../documents";
import { BaseRepo } from "./core";

@injectable()
export class ProductRepo extends BaseRepo<ProductEntity, ProductDocument> {
  constructor(@inRepository(ProductDocument) repo: Repository<ProductDocument>) {
    super(ProductEntity, ProductDocument, repo);
  }
}
