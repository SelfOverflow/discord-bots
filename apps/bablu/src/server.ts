import express from 'express';
import { PinoLogger as Logger } from '@bots/utils'
import { Client } from 'discord.js';

export const makeServer = (logger: Logger, bot: Client) => {
    const app = express();
    app.get("/check-birthday", async (req, res) => {
        res.status(200).send()
    })
    return app;
}