import {createDB} from '../../src/ultils/db'

describe('createDb', () => {
    it('should resolve with connection', async () => {
        const response = await createDB();
        expect(response).toEqual(expect.anything())
    })
})
