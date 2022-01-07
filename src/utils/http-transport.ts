type TFetchOptions = {
  method: string;
  data?: any;
  headers?: object;
  retries?: number;
  withCredentials?: boolean
}

type TOptions = {
  timeout?: number;
  data?: object;
  headers?: object;
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
  private readonly options: object;

  constructor(url = '', options?: object) {
    this._baseURL = 'https://ya-praktikum.tech/api/v2' + url;
    this.options = options || {};
  }

  get = (url = '', options: TOptions = {}) => {
    const requestOptions = Object.assign({}, this.options, options);
    const {timeout = 0} = requestOptions;
    return this.request(this._baseURL + url, {...requestOptions, method: METHODS.GET}, timeout);
  };
  post = (url = '', options: TOptions = {}) => {
    const requestOptions = Object.assign({}, this.options, options);
    const {timeout = 0} = options;
    return this.request(this._baseURL + url, {...requestOptions, method: METHODS.POST}, timeout);
  };
  put = (url = '', options: TOptions = {}) => {
    const requestOptions = Object.assign({}, this.options, options);
    const {timeout = 0} = options;
    return this.request(this._baseURL + url, {...requestOptions, method: METHODS.PUT}, timeout);
  };
  delete = (url = '', options: TOptions = {}) => {
    const requestOptions = Object.assign({}, this.options, options);
    const {timeout = 0} = options;
    return this.request(this._baseURL + url, {...requestOptions, method: METHODS.DELETE}, timeout);
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
        `${url}${queryStringify(data)}` :
        url);

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
        console.log(1111, JSON.stringify(data));
        xhr.send(JSON.stringify(data));
      }
    });
  };

  fetchWithRetry(url: string, options: TFetchOptions): Promise<XMLHttpRequest> {
    const {retries = 2} = options;
    const self = this;

    function onError(error: ErrorEvent): any {
      if ((retries - 1) <= 0) {
        throw new Error('Max retries exceeded');
      }
      if (error.message === 'A server with the specified hostname could not be found.') {
        throw new Error('Сервер не найден');
      }
      return self.fetchWithRetry(url, Object.assign(options, {retries: retries - 1}));
    }

    return this.request(url, options).catch(onError);
  }
}

export default HTTPTransport;
