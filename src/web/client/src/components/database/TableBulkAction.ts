import type { ContextAction } from "../core/ContextAction";

export type TableBulkAction<TContext> = ContextAction<
  TContext[],
  boolean | Promise<boolean>
>;
