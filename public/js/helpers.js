'use string'

const server = 'http://localhost:3001';

function ajax({ data, method, url, token }) {
  return new Promise((resolve, reject) => {
    const params = {
      url: server + url,
      async: true,
      data,
      method,
      dataType: 'json',
      timeout: 3000,
      success(res) {
        if (!(res instanceof Object) || res.ok !== true) {
          return reject(new Error('Broken response'));
        }
        resolve(res);
      },
      error({ status, responseJSON: response }) {
        console.error(response);
        if (status === 400 && response instanceof Object) {
          return reject({ ...response.errors });
        }
        reject({});
      }
    };
    if (typeof token === 'string') {
      params.headers = { authorization: 'Bearer ' + token };
    }
    $.ajax(params);
  });
}

function mapErrors(errors) {
  alert(JSON.stringify(errors)); // @todo: replace by another construction
}