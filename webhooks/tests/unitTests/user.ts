import { user } from '../../src/entity/users'
import { v4 as uuidv4 } from "uuid";
import {Connection, getRepository} from "typeorm";
import {closeDB, createDB} from "../../src/ultils/db";

type DummyUser = {id: string, name: string}

export function dummy() {
  return {
    id: uuidv4(),
    name: "Jerry"
  }
}

export async function createDummy(): Promise<DummyUser> {
  const userData = dummy()
  const userRepository = getRepository(user);
  const dbUser = await userRepository.save(userData)
  return dbUser
}


export async function deleteUser(userId: string): Promise<any> {
  const userRepository = getRepository(user);
  let dbUser = await userRepository.findOne({id: userId})
  if(dbUser)
  await userRepository.delete(dbUser.id);
}

let conn: Connection
describe('createUser', () => {
  beforeAll(async () => {
    conn = await createDB()
  })

  afterAll(async () => {
    // await deleteUser(userDetail.id)
    await closeDB(conn);
  })
  it('should resolve with true and valid userId', async () => {
    await expect(createDummy()).resolves.toEqual({
      id: expect.stringMatching(/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi),
      name: expect.stringContaining('Jerry')
    })
  })

})
