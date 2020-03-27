'use string'

class Messages {
  async load() {
    const params = {
      method: 'GET',
      url: `/chat/${global.selectedChat.id}`,
      token: true
    };
    const { messages } = await helpers.ajax(params);
    let html = `<table id="messages">`;

    messages.forEach(m => {
      html += `<tr>
        <th scope="row">${m.author.name}</th>
        <td>${m.content}</td>
      </tr>`;
    });
    html += `</table><br/>
      <textarea class="form-control" id="newMessage" rows="4"></textarea><br/>
      <button type="button" id="sendMessage" class="btn btn-primary">Send</button>
    `;
    global.elements.container.html(html);
  }

  addMessage({ author, content, type }) {
    const html = `<tr>
      <th scope=row>${author.name}</th>
      <td>${content}</td>
    </tr>`;
    $('#messages').append(html);
  }

  /**
   * Sending new message to the server
   */
  sendMessageAction() {
    $('body').on('click', '#sendMessage', async () => {
      const message = $('#newMessage').val();
      if (typeof message !== 'string' || message.length < 1) {
        return alert('Please, type a message')
      }
      const params = {
        method: 'PUT',
        url: `/message/${global.selectedChat.id}`,
        data: {
          content: message,
          type: 'text/plain'
        },
        token: true
      };
      const { message: result } = await helpers.ajax(params);
      $('#newMessage').val('');
    
      global.services.messages.addMessage({
        author: global.user,
        content: result.content,
        type: result.type
      });
    });
  }
}