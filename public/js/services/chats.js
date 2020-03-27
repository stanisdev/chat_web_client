'use string'

class Chats {
  async load() {
    const params = {
      method: 'GET',
      url: '/chat',
      token: true
    };
    const { chats } = await helpers.ajax(params);
    let html = '<table class="table table-hover mt125" id="chats">';
    
    for (let a = 0; a < chats.length; a++) {
      const chat = chats[a];
      const { last_message: lastMessage, name, id } = chat;
      let { content, created_at: createdAt } = lastMessage;
      if (typeof content !== 'string' || content.length < 1) {
        content = '';
      }
      createdAt = Number.isInteger(createdAt) ? new Date(createdAt) : '';
  
      html += `<tr>
        <th scope="row">
          <a class="cBlack chat" data-id="${id}" href="#/messages/${id}">${name}</a>
        </th>
        <td>${content}</td>
        <td>${createdAt}</td>
      </tr>`;
    }
    html += '</table>';
    global.elements.container.html(html);
  }

  /**
   * Select a chat
   */
  selectAction() {
    $('body').on('click', 'a.chat', (elem) => {
      global.selectedChat.id = $(elem.target).attr('data-id');
      global.services.messages.load();
    });
  }
}