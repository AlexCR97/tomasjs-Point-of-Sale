export class UpdateProductRequest {
  id!: string;
  name!: string;
  image?: string;

  clear() {
    this.id = "";
    this.name = "";
    this.image = undefined;
  }
}
