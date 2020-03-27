'use string'

const helpers = {};

helpers.ajax = ({ data, method, url, token }) => {
  return new Promise((resolve, reject) => {
    const params = {
      url: global.config.serverUrl + url,
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
    if (token === true) {
      params.headers = { authorization: 'Bearer ' + global.token };
    }
    $.ajax(params);
  });
}

helpers.mapErrors = (errors) => {
  alert(JSON.stringify(errors)); // @todo: replace by another construction
}