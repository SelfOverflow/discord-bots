import { config } from 'dotenv'
import { REST, Routes } from 'discord.js'

import { CommandRegistry } from '../infrastructure/discord/CommandRegistry'
config()

const register = async () => {
    const registry = new CommandRegistry();
    const commands = registry.getAll().map((command) => command.build().toJSON());
    if (process.env.DISCORD_TOKEN && process.env.CLIENT_ID) {
        try {
            const rest = new REST().setToken(process.env.DISCORD_TOKEN)
            await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });
            console.log('Commands refreshed successfully!')
        } catch (error) {
            console.log('Some error occured while refreshing commands!')
            console.error(error)
        }
    } else {
        console.log('Incorrect config!')
        if (!process.env.DISCORD_TOKEN) {
            console.error('Discord token was not found')
        }
        if (!process.env.CLIENT_ID) {
            console.error('Client ID was not found')
        }
    }
}

register();