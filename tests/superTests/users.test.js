const app = require('../../app');
const request = require('supertest');

test('It should create a new user', async()=> {
   await request(app).post('/api/users/signUp').send({
       name: "test",
       email: "test@gmail.com",
       password: "Test@123"
   })
   .expect(201)
})