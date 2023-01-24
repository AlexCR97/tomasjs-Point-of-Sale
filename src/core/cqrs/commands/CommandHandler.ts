export interface CommandHandler<TCommand extends object, TResult = void> {
  execute(command: TCommand): TResult | Promise<TResult>;
}
