import type { ContextAction } from "../core/ContextAction";

export type BulkAction<TContext> = ContextAction<
  TContext[],
  boolean | Promise<boolean>
>;
