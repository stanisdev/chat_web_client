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
    const { token } = await ajax(params);
    localStorage.setItem('token', token);
  } catch (errors) {
    return mapErrors(errors);
  }
});