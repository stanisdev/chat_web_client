'use string'

const token = localStorage.getItem('token');
const container = $('#container');
const chats = new Chats();
const messages = new Messages();

let [, entity] = window.location.href.split('/chats');
if (entity.includes('/messages')) {
  const chatId = entity.slice(entity.lastIndexOf('/') + 1);
  messages.load(chatId);
}
else {
  chats.load();
}

/**
 * Select a chat
 */
$('body').on('click', 'a.chat', (elem) => {
  const chatId = $(elem.target).attr('data-id');
  messages.load(chatId);
});