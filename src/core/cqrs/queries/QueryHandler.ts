export interface QueryHandler<TQuery extends object, TResult> {
  fetch(query: TQuery): TResult | Promise<TResult>;
}
