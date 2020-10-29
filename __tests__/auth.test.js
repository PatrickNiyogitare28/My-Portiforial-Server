require("@babel/polyfill");
const request = require('supertest');
jest.useFakeTimers()

const app = require('../app')

describe('Test Autho', ()=> {
    test('It should successfully login a user',async(done)=> {
      const response = await request(app).post('/api/users/login').send({
        email: "testuser5@gmail.com",
        password: "Test@123"
      });
      expect(response.statusCode).toBe(200);
      expect(response.text).toContain('true');
      expect(response.text).toContain('name');
      expect(response.text).toContain('email');
      expect(response.text).toContain('token');
      done();

  });
  test('It should fail to login if emai or password is invaid', async(done)=> {
    const response = await request(app).post('/api/users/login').send({
      email: "testuser5@gmail.com",
      password: "Test@1hgg"
    });
    expect(response.text).toContain('false');
    expect(response.text).toContain(401);
    expect(response.text).toContain('Invalid Email or Password');
    done();
  })
})