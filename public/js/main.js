'use string'

class Global {
  constructor() {
    this.token = localStorage.getItem('token');
    this.elements = {
      container: $('#container')
    };
    this.config = {
      serverUrl: 'http://localhost:3001',
      webSocketUrl: `ws://localhost:8080?token=${this.token}`
    };
    this.services = {
      chats: new Chats(),
      messages: new Messages()
    };
    this.selectedChat = {
      id: null
    };
    this.user = {
      id: localStorage.getItem('user.id'),
      name: localStorage.getItem('user.name')
    };
  }

  navigation(urlEntity) {
    if (urlEntity.includes('/messages')) {
      this.selectedChat.id = urlEntity.slice(urlEntity.lastIndexOf('/') + 1);
      this.services.messages.load();
    } else {
      this.services.chats.load();
    }
  }

  navigationAction() {
    $('a.navigatation').on('click', (elem) => {
      global.selectedChat.id = null;
      this.navigation($(elem.target).attr('data-entity'));
    });
  }

  logoutAction() {
    $('#logout').on('click', () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user.id');
      localStorage.removeItem('user.name');
      window.location = '/auth/login';
    });
  }
}