'use string'

class WebSocketService {
  constructor() {
    this.socket = new WebSocket(global.config.webSocketUrl);
  }

  load() {
    this.socket.addEventListener('open', () => {
      console.log('Connection established');
    });
  }

  receiveMessageAction() {
    this.socket.addEventListener('message', (event) => {
      const { author, content, type } = JSON.parse(event.data);
      if (global.selectedChat.id !== null) {
        global.services.messages.addMessage({ author, content, type });
      } else {
        // @todo: mark appropriate chat in the list by a new message
      }
    });
  }

  connectionLostAction() {
    this.socket.addEventListener('close', (event) => {
      console.log('Connection has been closed');
      // @todo: write setInterval function that try to establish connection repeatedly
    });
  }
}