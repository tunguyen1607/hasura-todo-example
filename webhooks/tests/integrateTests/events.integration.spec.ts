// import {
//     StatusCodes,
// } from 'http-status-codes';
import 'jest';
const fetch = require("isomorphic-unfetch");
import { v4 as uuidv4 } from "uuid";

describe('POST /handle-events', () => {
    it("should be to get list to do of self user", async () => {
        try {
            const response = await fetch(process.env.HASURA_ENDPOINT, {
                method: "POST",
                headers: {
                    "Authorization": "Bearer 4fc4d7e1-6cce-4e5d-bd63-871d1583808e",
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
            expect(data.todo[0].user_id).toEqual("4fc4d7e1-6cce-4e5d-bd63-871d1583808e");
        } catch (error) {
            console.log(error);
            throw error
        }
    });

    it("should be to create todo of self user", async () => {
        try {
            console.log(process.env.HASURA_ENDPOINT);
            const response = await fetch(process.env.HASURA_ENDPOINT, {
                method: "POST",
                headers: {
                    "Authorization": "Bearer 4fc4d7e1-6cce-4e5d-bd63-871d1583808e",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    query: `mutation MyMutation {
                                insert_todo_one(object: {completed: false, id: ${uuidv4()}, title: "New Task"}) {
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
            console.log(response);
            expect(response.status).toEqual(200);
            const {data} = await response.json();
            expect(data.insert_todo_one).toMatchObject({
                "data": {
                    "insert_todo_one": {
                        "completed": expect.anything(),
                        "created_at": expect.anything(),
                        "id": expect.anything(),
                        "title": expect.anything(),
                        "updated_at": expect.anything(),
                        "user_id": "4fc4d7e1-6cce-4e5d-bd63-871d1583808e"
                    }
                }
            });
            expect(data.insert_todo_one.user_id).toEqual("4fc4d7e1-6cce-4e5d-bd63-871d1583808e");
        } catch (error) {
            console.log(error);
            throw error
        }
    });
});
