'use string'

const global = new Global();

[Global, Messages, Chats].forEach(Class => {
  executeActions(Class);
});

function executeActions(Class) {
  const instance = new Class();

  Object.getOwnPropertyNames(Class.prototype)
    .filter(m => m !== 'constructor')
    .forEach(method => {
      if (method.includes('Action')) {
        instance[method]();
      }
    });
}

let urlEntity = window.location.href.split('/chats')[1];
global.navigation(urlEntity);

const websocket = new WebSocketService();
websocket.load();
websocket.receiveMessageAction();
websocket.connectionLostAction();