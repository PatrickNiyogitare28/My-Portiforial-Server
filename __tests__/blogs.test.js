require("@babel/polyfill");
const request = require('supertest');
jest.useFakeTimers();

const app = require('../app')

describe('Test blogs', ()=> {
    test('It should successfully get blogs', async(done) => {
        const response = await request(app).get('/api/blogs/allBlogs');
        expect(response.text).toContain('true');
        expect(response.text).toContain(200);
        done();
    });

test('It should successfuly get blog by Id', async(done)=> {
    const response = await request(app).get('/api/blogs/getBlog/5f9aac102f9edf1ab0d793b7');
    expect(response.text).toContain('true');
    expect(response.text).toContain(200);
    done();
})    
});
