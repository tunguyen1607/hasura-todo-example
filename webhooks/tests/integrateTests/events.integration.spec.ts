// import {
//     StatusCodes,
// } from 'http-status-codes';
import 'jest';
const fetch = require("isomorphic-unfetch");
import { v4 as uuidv4 } from "uuid";
import {createDummy} from '../unitTests/user';
import {closeDB, createDB} from "../../src/ultils/db";
import {Connection} from "typeorm";
let userDetail: any;
let conn: Connection


describe('POST /handle-events', () => {
    beforeAll(async () => {
        conn = await createDB()
        userDetail = await createDummy();
        console.log(userDetail)
    })

    afterAll(async () => {
        await closeDB(conn);
    })
    it("should be to create todo of self user", async () => {
        try {
            console.log(process.env.HASURA_ENDPOINT);
            const response = await fetch(process.env.HASURA_ENDPOINT, {
                method: "POST",
                headers: {
                    "Authorization": "Bearer "+userDetail.id,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    query: `mutation MyMutation {
                                insert_todo_one(object: {completed: false, id: "${uuidv4()}", title: "New Task"}) {
                                completed
                                created_at
                                id
                                title
                                updated_at
                                user_id
                                }
                                }`,
                    variables: {},
                }),
            });
            expect(response.status).toEqual(200);
            const {data} = await response.json();
            expect(data.insert_todo_one).toMatchObject({
                "completed": expect.anything(),
                "created_at": expect.anything(),
                "id": expect.anything(),
                "title": expect.anything(),
                "updated_at": expect.anything(),
                "user_id": userDetail.id
            });
            expect(data.insert_todo_one.user_id).toEqual(userDetail.id);
        } catch (error) {
            console.log(error);
            throw error
        }
    });

    it("should be to get list to do of self user", async () => {
        try {
            const response = await fetch(process.env.HASURA_ENDPOINT, {
                method: "POST",
                headers: {
                    "Authorization": "Bearer "+userDetail.id,
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    query: `query MyQuery {
                                          todo(limit: 10) {
                                            completed
                                            created_at
                                            id
                                            title
                                            updated_at
                                            user_id
                                          }
                                        }`,
                    variables: {},
                }),
            });
            const {data} = await response.json();
            expect(data.todo.length).toBeGreaterThan(0);
            expect(data.todo[0].user_id).toEqual(userDetail.id);
        } catch (error) {
            console.log(error);
            throw error
        }
    });


});
