const express = require('express');
const app = express();


describe('GET', () => {
    test('/users should return an array of user objects', (done) => {
        request(app)
            .get('/users')
            .expect(200)
            .expect((res) => {
                expect(res.body.length).toBe(3)
            })
            .end((err, res) => {
                if(err) throw err;
                done();
            })
    })

    test('/users/1 should return the movie object with id of 1', (done) => {
        request(app)
            .get('/users/1')
            .expect(200)
            .expect((res) => {
                expect(res.body.title).toBe('joshypoo')
            })
            .end((err, res) => {
                if (err) throw err;
                done();
            })
    })
})


describe('POST', () => {
    const newUser = {
        username: 'justiepoo',
    }
    test('/users should add a new user to the users list and return a confirmation message', (done) => {
        request(app)
            .post('/users')
            .send(newUser)
            .set('Accept', 'application/json')
            .expect(201)
            .expect((res) => {
                expect(res.body).toBe('justiepoo added to the user library.')
            })
            .end((err, res) => {
                if (err) throw err;
                request(app)
                    .get('/users')
                    .expect(200)
                    .expect((res) => {
                        expect(res.body.length).toBe(4)
                    })
                    .end((err, res) => {
                        if (err) throw err;
                        done()
                    })
            })
    })
})