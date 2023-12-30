require('dotenv').config();
const { Client, Partials, GatewayIntentBits, Collection, ActivityType } = require('discord.js');
const eventHandler = require('./events/eventHandler');

// Initialize bot client with proper partials and intents
// You will want to decide what intents to allow your bot to access, these are just the ones I pretty much always need.
const bot = new Client({
	partials: [Partials.Message, Partials.Reaction, Partials.GuildMember, Partials.Channel],
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildPresences,
		GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.DirectMessageReactions,
	],
});

// Create a new collection of commands
bot.commands = new Collection();
bot.slashCommands = new Collection();

// Handle events
eventHandler(bot);

// Login bot
bot.login(process.env.DISCORD_TOKEN);
