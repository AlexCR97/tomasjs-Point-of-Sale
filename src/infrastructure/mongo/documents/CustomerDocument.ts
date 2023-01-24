import { AutoMap } from "@automapper/classes";
import { Entity, Property } from "@mikro-orm/core";
import { BaseDocument } from "./BaseDocument";

@Entity()
export class CustomerDocument extends BaseDocument {
  @Property({ nullable: true })
  @AutoMap()
  firstName?: string;

  @Property({ nullable: true })
  @AutoMap()
  lastName?: string;
}
