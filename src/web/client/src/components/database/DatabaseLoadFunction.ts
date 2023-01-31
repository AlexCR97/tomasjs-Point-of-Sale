export type DatabaseLoadFunction<TModel extends object> = () =>
  | TModel[]
  | Promise<TModel[]>;
