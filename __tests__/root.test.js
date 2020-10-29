require("@babel/polyfill");
// import "core-js/stable";
// import "regenerator-runtime/runtime";

const request = require('supertest');
jest.useFakeTimers()

const app = require('../app')

describe('Test the root path', () => {

 it('It should response the GET method', async(done) => {

 await request(app).get('/').then((response) => {

 expect(response.statusCode).toBe(200);

 done();

 });

 });

});