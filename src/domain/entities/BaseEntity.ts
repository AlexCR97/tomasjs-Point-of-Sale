import { AutoMap } from "@automapper/classes";
import { ObjectId } from "@mikro-orm/mongodb";

export class BaseEntity {
  @AutoMap(() => ObjectId)
  _id!: ObjectId;

  @AutoMap()
  createdAt!: Date;

  @AutoMap()
  createdBy?: string;

  @AutoMap()
  updatedAt?: Date;

  @AutoMap()
  updatedBy?: string;

  @AutoMap()
  deletedAt?: Date;

  @AutoMap()
  deletedBy?: string;
}
