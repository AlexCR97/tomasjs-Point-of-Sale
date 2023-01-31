import type { FindRequest } from "./FindRequest";

export interface ApiStore<TModel, TCreateRequest, TUpdateRequest> {
  createAsync(request: TCreateRequest): Promise<string>;
  deleteAsync(id: string): Promise<void>;
  findAsync(request?: FindRequest): Promise<TModel[]>;
  getAsync(id: string): Promise<TModel>;
  updateAsync(id: string, request: TUpdateRequest): Promise<void>;
}
