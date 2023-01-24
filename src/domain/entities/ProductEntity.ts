import { AutoMap } from "@automapper/classes";
import { BaseEntity } from "./BaseEntity";

export class ProductEntity extends BaseEntity {
  @AutoMap()
  name!: string;

  @AutoMap()
  image?: string;
}
