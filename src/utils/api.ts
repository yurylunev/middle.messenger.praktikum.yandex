type TFetchOptions = {
  method: string;
  data?: any;
  headers?: object;
  retries?: number;
  withCredentials?: boolean
}

const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
};

function queryStringify(data: object) {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }
  return `?${Object.entries(data).map((val) => val.join('=')).join('&')}`;
}

class HTTPTransport {
  private readonly _baseURL: string;
  constructor(baseURL:string) {
    this._baseURL = baseURL;
  }
  get = (url: string, options = {timeout: 0}) => {
    return this.request(this._baseURL + url, {...options, method: METHODS.GET}, options.timeout);
  };
  post = (url: string, options = {timeout: 0}) => {
    return this.request(this._baseURL + url, {...options, method: METHODS.POST}, options.timeout);
  };
  put = (url: string, options = {timeout: 0}) => {
    return this.request(this._baseURL + url, {...options, method: METHODS.PUT}, options.timeout);
  };
  delete = (url: string, options = {timeout: 0}) => {
    return this.request(this._baseURL + url, {...options, method: METHODS.DELETE}, options.timeout);
  };

  request = (url: string,
      options: TFetchOptions,
      timeout = 5000): Promise<XMLHttpRequest> => {
    const {method = 'GET', data, headers = {}, withCredentials = false} = options;
    return new Promise((resolve, reject) => {
      if (!method) {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject('No method');
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGET = (method === METHODS.GET);

      xhr.open(method, (isGET && !!data) ?
        `${this._baseURL + url}${queryStringify(data)}` :
        this._baseURL + url);

      Object.entries(headers).forEach((header) => {
        xhr.setRequestHeader(header[0], header[1]);
      });

      xhr.onload = function() {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;
      xhr.withCredentials = withCredentials;

      if (isGET || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}

const http = new HTTPTransport('https://ya-praktikum.tech/api/v2');

// eslint-disable-next-line no-unused-vars
async function fetchWithRetry(url: string, options: TFetchOptions): Promise<XMLHttpRequest> {
  const {retries = 2} = options;

  function onError(error: ErrorEvent): any {
    if ((retries - 1) <= 0) {
      throw new Error('Max retries exceeded');
    }
    if (error.message === 'A server with the specified hostname could not be found.') {
      throw new Error('Сервер не найден');
    }
    return fetchWithRetry(url, Object.assign(options, {retries: retries - 1}));
  }

  return http.request(url, options).catch(onError);
}

export default fetchWithRetry;
