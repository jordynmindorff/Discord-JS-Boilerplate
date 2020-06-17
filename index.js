require('dotenv').config();
const Discord = require('discord.js');
const { readyEvent, messageEvent } = require('./utils/botEvents');
const { setupFiles } = require('./utils/setupFiles');

// Initialize bot client with partials for reactions and messages
const bot = new Discord.Client({ partials: ['MESSAGE', 'REACTION'] });

// Create a new collection of commands
bot.commands = new Discord.Collection();

// Setup Command Files and Commands Collection
setupFiles(bot);

// Setup and Misc on Ready
bot.on('ready', async () => {
	readyEvent(bot, 'STATUS HERE');
});

// Handle Command
bot.on('message', async (message) => {
	messageEvent(message, bot);
});

// Keep the bot alive by sending console message to heroku
setTimeout(function wakeUp() {
	console.log('WAKE UP DYNO');
	return setTimeout(wakeUp, 120000);
}, 120000);

// Login Using Token
bot.login(process.env.DISCORD_TOKEN);
