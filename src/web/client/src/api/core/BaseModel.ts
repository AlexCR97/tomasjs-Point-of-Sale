export class BaseModel {
  _id!: string;

  createdAt?: string | Date;
  createdBy?: string;

  updatedAt?: string | Date;
  updatedBy?: string;

  deletedAt?: string | Date;
  deletedBy?: string;
}
