import { AutoMap } from "@automapper/classes";
import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { ObjectId } from "@mikro-orm/mongodb";

@Entity({ abstract: true })
export class BaseDocument {
  @PrimaryKey()
  @AutoMap(() => ObjectId)
  _id!: ObjectId;

  @Property({ onCreate: () => new Date() })
  @AutoMap()
  createdAt!: Date;

  @Property({ nullable: true })
  @AutoMap()
  createdBy?: string;

  @Property({
    nullable: true,
    onCreate: () => new Date(),
    onUpdate: () => new Date(),
  })
  @AutoMap()
  updatedAt?: Date;

  @Property({ nullable: true })
  @AutoMap()
  updatedBy?: string;

  @Property({ nullable: true })
  @AutoMap()
  deletedAt?: Date;

  @Property({ nullable: true })
  @AutoMap()
  deletedBy?: string;
}
