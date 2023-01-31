export interface IDatabase {
  loadTableAsync(): Promise<any[]>;
}
