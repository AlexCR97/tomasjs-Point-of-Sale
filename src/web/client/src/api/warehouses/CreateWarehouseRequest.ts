export class CreateWarehouseRequest {
  name!: string;

  clear() {
    this.name = "";
  }
}
