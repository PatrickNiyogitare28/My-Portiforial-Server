const app = require('../../app');
const request = require('supertest');
// import "babel-polyfill"
import 'regenerator-runtime/runtime'
jest.useFakeTimers()

describe('Test for singup', ()=> {
   it('Should successfully signup a new user', async() => {
    const res = await request(app).post('/api/users/signUp').send({
        name: "test",
        email: "test@gmail.com",
        password: "Test@123"
    })
    console.log("////res "+res);
    expect(res.statusCode()).toBe(201)
   });
  
})