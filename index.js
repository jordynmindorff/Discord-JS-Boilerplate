require('dotenv').config();
const Discord = require('discord.js');
const eventHandler = require('./events/eventHandler');

// Initialize bot client with proper partials and intents
const bot = new Discord.Client({
	partials: ['MESSAGE', 'REACTION', 'GUILD_MEMBER', 'CHANNEL'],
	intents: [
		Discord.Intents.FLAGS.GUILDS,
		Discord.Intents.FLAGS.GUILD_MESSAGES,
		Discord.Intents.FLAGS.GUILD_MEMBERS,
		Discord.Intents.FLAGS.GUILD_PRESENCES,
		Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
		Discord.Intents.FLAGS.DIRECT_MESSAGES,
		Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
	],
});

// Create a new collection of commands
bot.commands = new Discord.Collection();
bot.slashCommands = new Discord.Collection();

// Handle events
eventHandler(bot);

// Login bot
bot.login(process.env.DISCORD_TOKEN);
