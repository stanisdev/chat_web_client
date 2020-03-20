'use string'

const server = 'http://localhost:3000';

function ajax({ data, method, url }) {
  return new Promise((resolve, reject) => {
    $.ajax({
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
        if (status === 400 && response instanceof Object) {
          return reject({ ...response.errors });
        }
        reject({});
      }
    });
  });
}

function mapErrors(errors) {
  alert(JSON.stringify(errors)); // @todo: replace by another construction
}