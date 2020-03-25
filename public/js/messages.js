'use string'

let chatId;

class Messages {
  async load(_chatId) {
    const params = {
      method: 'GET',
      url: `/chat/${_chatId}`,
      token
    };
    const { messages } = await ajax(params);
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
    
    chatId = _chatId;
    container.html(html);
  }
}

$('body').on('click', '#sendMessage', async () => {
  const message = $('#newMessage').val();
  if (typeof message !== 'string' || message.length < 1) {
    return alert('Please, type a message')
  }
  const params = {
    method: 'PUT',
    url: `/message/${chatId}`,
    data: {
      content: message,
      type: 'text/plain'
    },
    token
  };
  const { message: result } = await ajax(params);
  $('#newMessage').val('');

  const userName = localStorage.getItem('user.name');
  const html = `<tr>
    <th scope=row>${userName}</th>
    <td>${result.content}</td>
  </tr>
  `;
  $('#messages').append(html);
});