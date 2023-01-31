export type DatabaseFilters<TModel extends object> = {
  [key in keyof TModel]?: DatabaseFilterMetadata;
};

export interface DatabaseFilterMetadata {
  value?: any;

  /**
   * See `FilterMatchModeOptions` from `primevue/api`
   */
  matchMode: string;
}
