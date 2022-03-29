const request = require('supertest');

test('GET /users without token', async () => {
  const res = await request(apiUrl).get('/users');

  expect(res.statusCode).toEqual(500);
});

test('GET /users with token', async () => {
  const res = await request(apiUrl)
    // .set('')
    .get('/users');

  expect(res.statusCode).toEqual(500);
});
