export interface DatabaseColumn<TModel extends object> {
  /** The display value for the header */
  header: string;

  /** A property/key of the model */
  field: keyof TModel;
}
