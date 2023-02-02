export class CreateProductRequest {
  name!: string;
  image?: string;

  clear() {
    this.name = "";
    this.image = undefined;
  }
}
