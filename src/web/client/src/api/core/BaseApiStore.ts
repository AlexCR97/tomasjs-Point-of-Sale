import type { AxiosInstance } from "axios";
import type { ApiStore } from "./ApiStore";
import type { FindRequest } from "./FindRequest";
import { useAxios } from "./useAxios";

export class BaseApiStore<TModel, TCreateRequest, TUpdateRequest>
  implements ApiStore<TModel, TCreateRequest, TUpdateRequest>
{
  private readonly api: AxiosInstance;

  constructor(basePath: string) {
    this.api = useAxios(basePath); // TODO Build baseURL
  }

  async createAsync(request: TCreateRequest): Promise<string> {
    return await this.api.post(this.url(), request);
  }

  async deleteAsync(id: string): Promise<void> {
    await this.api.delete(this.url(id));
  }

  async findAsync(request?: FindRequest): Promise<TModel[]> {
    const response = await this.api.get<TModel[]>(this.url(), {
      params: request,
    });
    return response.data;
  }

  async getAsync(id: string): Promise<TModel> {
    const response = await this.api.get<TModel>(this.url(id));
    return response.data;
  }

  async updateAsync(id: string, request: TUpdateRequest): Promise<void> {
    await this.api.put(this.url(id), request);
  }

  protected url(...parts: string[]): string {
    return [...parts].join("/");
  }
}
