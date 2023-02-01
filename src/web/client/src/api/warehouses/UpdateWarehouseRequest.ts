export class UpdateWarehouseRequest {
  id!: string;
  name!: string;

  clear() {
    this.id = "";
    this.name = "";
  }
}
