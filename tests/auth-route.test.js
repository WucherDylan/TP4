const request = require('supertest');

test('POST /login', async () => {
  const res = await request(apiUrl)
    .post('/login')
    .send({
      firstName: 'Charlely',
      password: 'password',
    });

  expect(res.statusCode).toEqual(200)
  expect(res.body).toHaveProperty('token');
});
