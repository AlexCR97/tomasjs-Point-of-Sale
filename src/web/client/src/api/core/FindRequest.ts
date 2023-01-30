export class FindRequest {
  readonly pageIndex?: number;
  readonly pageSize?: number;
  readonly filter?: string;
  readonly sort?: string;

  constructor(options?: {
    pageIndex?: number;
    pageSize?: number;
    filter?: string;
    sort?: string;
  }) {
    this.pageIndex = options?.pageIndex;
    this.pageSize = options?.pageSize;
    this.filter = options?.filter;
    this.sort = options?.sort;
  }
}
