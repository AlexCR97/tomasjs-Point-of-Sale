import { BaseApiStore } from "../core";
import type { CreateProductRequest } from "./CreateProductRequest";
import type { ProductModel } from "./ProductModel";
import type { UpdateProductRequest } from "./UpdateProductRequest";

export class ProductStore extends BaseApiStore<
  ProductModel,
  CreateProductRequest,
  UpdateProductRequest
> {
  constructor() {
    super("products");
  }
}
