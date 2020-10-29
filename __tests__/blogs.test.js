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
    const response = await request(app).get('/api/blogs/getBlog/5f995af89e25e45a31dbffdc');
    expect(response.text).toContain('true');
    expect(response.text).toContain(200);
    done();
})    
});
