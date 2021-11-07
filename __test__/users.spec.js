//
// const request = require('supertest')
// const app = require('../server')
// describe("GET / ",  () => {
//     test("It should respond with a list of users", async () => {
//         const response = await request(app).get("/api/users");
//         expect(response.statusCode).toBe(200);
//     });
// });

const supertest = require('supertest')
const http = require('http')
const app = require('../server')

describe('demo test', () => {
    let server;
    let request;

    beforeAll((done) => {
        server = http.createServer(app);
        server.listen(done);
        request = supertest(server);
    });

    afterAll((done) => {
        server.close(done);
    });

    it('returns 200 list of users', async () => {
        const response = await request.get('/api/users');
        expect(response.status).toBe(200);
    });

    it('post user to create an already existing user', async () => {
        const response = await request.post('/api/users/test123')
        expect(response.status).toBe(500);
        expect(response.text).toBe('Name already exists.');
    });

    it('post user to create a sample user', async () => {
        const response = await request.post('/api/users/test1234')
        expect(response.status).toBe(201);
    });

});
