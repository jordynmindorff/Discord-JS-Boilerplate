require('dotenv').config();
const Discord = require('discord.js');
const setupFiles = require('./extras/setupFiles');
const eventHandler = require('./events/eventHandler');

// Initialize bot client with partials for reactions and messages
const bot = new Discord.Client({ partials: ['MESSAGE', 'REACTION', 'GUILD_MEMBER'] });

// Create a new collection of commands
bot.commands = new Discord.Collection();

// Setup Command Files and Collection
setupFiles(bot);

// Handle events
eventHandler(bot);

// Login bot
bot.login(process.env.DISCORD_TOKEN);
