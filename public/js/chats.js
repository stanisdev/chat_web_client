'use string'

class Chats {
  async load() {
    const params = {
      method: 'GET',
      url: '/chat',
      token
    };
    const { chats } = await ajax(params);
    
    for (let a = 0; a < chats.length; a++) {
      const chat = chats[a];
      const { last_message: lastMessage, name, id } = chat;
      let { content, created_at: createdAt } = lastMessage;
      if (typeof content !== 'string' || content.length < 1) {
        content = '';
      }
      createdAt = Number.isInteger(createdAt) ? new Date(createdAt) : '';
  
      const html = `<tr>
        <th scope="row">
          <a class="cBlack chat" data-id="${id}" href="#/messages/${id}">${name}</a>
        </th>
        <td>${content}</td>
        <td>${createdAt}</td>
      </tr>`;
      $('#chats').append(html);
    }
  }
}