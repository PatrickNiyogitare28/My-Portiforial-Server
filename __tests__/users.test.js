require("@babel/polyfill");
const request = require('supertest');
jest.useFakeTimers()

const app = require('../app')

describe('Test User', () => {

//success signup
 test('Should successfully signup a user', async(done) => {

const response = await request(app).post('/api/users/signUp').send({
     name:"Test User",
     email: "testuser20@gmail.com",
     password: "Test@123"
 });

 expect(response.text).toContain("User created");

 done();

 });

 //signup with used email
 test('Should fail to signup a new user if the email was used', async(done)=> {
   const response = await request(app).post('/api/users/signUp').send({
    name:"Test User",
    email: "makuza@gmail.com",
    password: "Test@123"
   });
   expect(response.text).toContain('User already registered');
   done();
});

//signup with invalid name
test('Should fail to signup a new user if the name is invalid', async(done)=> {
    const response = await request(app).post('/api/users/signUp').send({
     name:"",
     email: "testuser5@gmail.com",
     password: "Test@123"
    });
    expect(response.text).toContain('false');
    done();
 });

 //signup with invalid email
test('Should fail to signup a new user if the email is invalid', async(done)=> {
    const response = await request(app).post('/api/users/signUp').send({
     name:"Test User",
     email: "",
     password: "Test@123"
    });
    expect(response.text).toContain('false');
    done();
 });

 test('Should fail to signup a new user if the password is invalid', async(done)=> {
    const response = await request(app).post('/api/users/signUp').send({
     name:"Test User",
     email: "test1user@gmail.com",
     password: ""
    });
    expect(response.text).toContain('false');
    done();
 });

});