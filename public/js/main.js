'use string'

const token = localStorage.getItem('token');
const container = $('#container');
const chats = new Chats();
const messages = new Messages();
let [, entity] = window.location.href.split('/chats');

function navigatation(entity) {
  if (entity.includes('/messages')) {
    const chatId = entity.slice(entity.lastIndexOf('/') + 1);
    messages.load(chatId);
  }
  else {
    chats.load();
  }
}

/**
 * Select a chat
 */
$('body').on('click', 'a.chat', (elem) => {
  const chatId = $(elem.target).attr('data-id');
  messages.load(chatId);
});

/**
 * Logout action
 */
$('#logout').on('click', () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user.id');
  localStorage.removeItem('user.name');
  window.location = '/auth/login';
});

$('a.navigatation').on('click', (elem) => {
  navigatation($(elem.target).attr('data-entity'));
});
navigatation(entity);