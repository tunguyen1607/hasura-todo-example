import {createDB, closeDB} from '../../src/ultils/db'
import {createServer} from '../../src/ultils/server'
import {
    StatusCodes,
} from 'http-status-codes';
import 'jest';
import {Express} from 'express';
// @ts-ignore
import request from 'supertest';
import {Connection} from "typeorm";

let server: Express
let conn: Connection


import {createDummy, deleteUser} from '../unitTests/user';

describe('GET /wh', () => {
    beforeAll(async () => {
        conn = await createDB()
        server = await createServer()
    })

    afterAll(async () => {
        await closeDB(conn);
    })
    it('should return 401 & valid response if authenticated user was deleted', async () => {
        const dummy = await createDummy()
        await deleteUser(dummy.id)
        await request(server)
            .get(`/wh`)
            .set('Authorization', `Bearer ${dummy.id}`)
            .expect('Content-Type', /json/)
            .expect(401)
    })
    it('should return 200 & valid response if token is valid',  done => {
         request(server)
            .get(`/wh`)
            .set('Authorization', 'Bearer hasura')
            .expect('Content-Type', /json/)
            .expect(StatusCodes.OK)
            .end((err, res) => {
                if (err) return done(err)
                expect(res.body).toMatchObject({
                    'X-Hasura-Role': 'admin',
                    'X-Hasura-User-Id': 'admin',
                    'X-Hasura-Is-Owner': 'false'
                })
                done()
            });
    });
    it('should return 401 & reponse error if token is invalid',  done => {
        request(server)
            .get(`/wh`)
            .set('Authorization', 'Bearer invalidToken')
            .expect('Content-Type', /json/)
            .expect(StatusCodes.UNAUTHORIZED)
            .end((err, res) => {
                if (err) return done(err)
                expect(res.body).toMatchObject({msg: "Invalid token"})
                done()
            });
    });
});
