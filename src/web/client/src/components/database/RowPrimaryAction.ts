import type { ButtonOptions, ContextAction } from "../core";

export type RowPrimaryAction<TContext> = ContextAction<TContext> & ButtonOptions;
