const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const dotenv = require('dotenv');
dotenv.config();

const commands = [
    new SlashCommandBuilder().setName('play').setDescription('Play a song'),
    new SlashCommandBuilder().setName('pause').setDescription('Pause the song'),
    new SlashCommandBuilder().setName('skip').setDescription('Skip the current song'),
    new SlashCommandBuilder().setName('queue').setDescription('Show the song queue'),
]
    .map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();
