export type ContextAction<TContext = void, TResult = void> = {
  icon?: string;
  label?: string;
  separator?: boolean;
  action?: (context: TContext) => TResult;
  disabled?: (context: TContext) => boolean;
  hidden?: (context: TContext) => boolean;
};
