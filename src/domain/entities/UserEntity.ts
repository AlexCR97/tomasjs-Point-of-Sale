import { AutoMap } from "@automapper/classes";
import { BaseEntity } from "./BaseEntity";

export class UserEntity extends BaseEntity {
  @AutoMap()
  username!: string;

  @AutoMap()
  password!: string;

  @AutoMap()
  firstName?: string;

  @AutoMap()
  lastName?: string;
}
