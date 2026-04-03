import { config } from 'dotenv'
import { makeApp } from './app'
import { makeServer } from './server'
import { PinoLogger } from '@bots/utils'
config();

const handler = () => {
    const logger = new PinoLogger();
    const bot = makeApp(logger)
    const server = makeServer(logger, bot)
    const PORT = 3000;
    if (process.env.DISCORD_TOKEN) {
        bot.login(process.env.DISCORD_TOKEN);
        server.listen(PORT, () => {
            console.log('Server is up and running');
        })
    }
}

handler();