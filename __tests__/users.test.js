require("@babel/polyfill");
// import "core-js/stable";
// import "regenerator-runtime/runtime";

const request = require('supertest');
jest.useFakeTimers()

const app = require('../app')

describe('Test User', () => {

 test('Should successfully signup a user', async(done) => {

const response = await request(app).post('/api/users/signUp').send({
     name:"Test User",
     email: "testuser5@gmail.com",
     password: "Test@123"
 });
console.log("Response....."+JSON.stringify(response.text));
 expect(response.text).toContain("User created");

 done();

 });

 

});