'use string'

$('button[type="submit"]').on('click', async () => {
  const password = $('#password').val();
  const email = $('#email').val();

  const params = {
    data: { email, password },
    url: '/auth/login',
    method: 'POST'
  };

  try {
    const { token, user } = await ajax(params);
    localStorage.setItem('token', token);
    localStorage.setItem('user.id', user.id);
    localStorage.setItem('user.name', user.name);
    window.location = '/chats';
  } catch (errors) {
    return mapErrors(errors);
  }
});