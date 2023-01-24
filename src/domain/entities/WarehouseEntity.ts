import { AutoMap } from "@automapper/classes";
import { BaseEntity } from "./BaseEntity";

export class WarehouseEntity extends BaseEntity {
  @AutoMap()
  name!: string;
}
