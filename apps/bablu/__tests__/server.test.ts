import { makeServer } from '../src/server'
import { makeApp } from '../src/app'
import { PinoLogger } from '@bots/utils'
import supertest from 'supertest';

describe('Server tests', () => {
    const logger = new PinoLogger();
    const app = makeApp(logger);
    const server = makeServer(logger, app);

    it('We should be able to hit the /check-birthday endpoint', async () => {
        const res = await supertest(server).get("/check-birthday")
        expect(res.status).toBe(200)
    })
})