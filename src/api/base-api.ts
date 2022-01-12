import HTTPTransport from '../utils/http-transport';

export default abstract class BaseAPI {
  protected http: HTTPTransport;

  protected constructor(endpoint: string, options?: object) {
    this.http = new HTTPTransport(endpoint, options);
  }

  public abstract create?(data: unknown): Promise<unknown>;

  public abstract read?(identifier?: string): Promise<unknown>;

  public abstract update?(identifier: string, data: unknown): Promise<unknown>;

  public abstract delete?(identifier?: string): Promise<unknown>;
}
