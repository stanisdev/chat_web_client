'use string'

class Messages {
  async load(chatId) {
    const params = {
      method: 'GET',
      url: `/chat/${chatId}`,
      token
    };
    const { messages } = await ajax(params);
    let html = `<table id="messages">`;
    console.log(JSON.stringify(messages));

    messages.forEach(m => {
      html += `<tr>
        <th scope="row">${m.author.name}</th>
        <td>${m.content}</td>
      </tr>`;
    });
    html += `</table><br/>
      <textarea class="form-control" id="newMessage" rows="4"></textarea><br/>
      <button type="submit" class="btn btn-primary">Submit</button>
    `;
    
    container.html(html);
  }
}