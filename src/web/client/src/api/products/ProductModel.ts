import { BaseModel } from "../core";

export class ProductModel extends BaseModel {
  name!: string;
  image?: string;
}
