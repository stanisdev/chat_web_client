'use string'

const global = { // @todo: fix this
  config: {
    serverUrl: 'http://localhost:3001'
  }
};

$('button[type="submit"]').on('click', async () => {
  const password = $('#password').val();
  const email = $('#email').val();

  const params = {
    data: { email, password },
    url: '/auth/login',
    method: 'POST'
  };

  try {
    const { token, user } = await helpers.ajax(params);
    localStorage.setItem('token', token);
    localStorage.setItem('user.id', user.id);
    localStorage.setItem('user.name', user.name);
    window.location = '/chats';
  } catch (errors) {
    console.error(errors);
    return helpers.mapErrors(errors);
  }
});