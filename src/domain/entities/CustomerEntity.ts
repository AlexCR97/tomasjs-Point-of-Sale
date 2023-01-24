import { AutoMap } from "@automapper/classes";
import { BaseEntity } from "./BaseEntity";

export class CustomerEntity extends BaseEntity {
  @AutoMap()
  firstName?: string;

  @AutoMap()
  lastName?: string;
}
