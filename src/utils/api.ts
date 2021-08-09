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
    get = (url: string, options = {timeout: 0}) => {
        return this.request(url, {...options, method: METHODS.GET}, options.timeout);
    };
    post = (url: string, options = {timeout: 0}) => {
        return this.request(url, {...options, method: METHODS.POST}, options.timeout);
    };
    put = (url: string, options = {timeout: 0}) => {
        return this.request(url, {...options, method: METHODS.PUT}, options.timeout);
    };
    delete = (url: string, options = {timeout: 0}) => {
        return this.request(url, {...options, method: METHODS.DELETE}, options.timeout);
    };

    request = (url: string, options: { method: string; data?: any; headers?: object; retries?: number }, timeout = 5000) => {
        const {method = 'GET', data, headers = {}} = options;

        return new Promise((resolve, reject) => {
            if (!method) {
                reject('No method');
                return;
            }

            const xhr = new XMLHttpRequest();
            const isGET = (method === METHODS.GET);

            xhr.open(method, (isGET && !!data)
                ? `${url}${queryStringify(data)}`
                : url);

            Object.entries(headers).forEach((header) => {
                xhr.setRequestHeader(header[0], header[1]);
            });

            xhr.onload = function () {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;

            xhr.timeout = timeout;
            xhr.ontimeout = reject;

            if (isGET || !data) {
                xhr.send();
            } else {
                xhr.send(data);
            }
        });
    };
}

const http = new HTTPTransport;

function fetchWithRetry(url: string, options: { method: string; data?: any; headers?: object; retries?: number }) {
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
