require('dotenv').config();
const Discord = require('discord.js');
const fs = require('fs');
const mongoConnect = require('./utils/db');
const handleLoaReaction = require('./extras/handleLoaReaction');

// Initialize bot client with partials for reactions and messages
const bot = new Discord.Client({ partials: ['MESSAGE', 'REACTION'] });

// Create a new collection of commands
bot.commands = new Discord.Collection();

// Connect to DB
mongoConnect();

fs.readdir('./commands/', async (err, files) => {
	// If there's an error in reading the directory, log it
	if (err) console.log(err);

	// take the list of files and get the .js ones
	const jsFile = files.filter(f => f.split('.').pop() === 'js');

	// If there are no files, return
	if (jsFile.length <= 0) {
		console.log("Couldn't find commands.");
		return;
	}

	// Add the files to commands
	jsFile.forEach((f, i) => {
		let props = require(`./commands/${f}`);
		console.log(`${f} loaded!`);
		bot.commands.set(props.name, props);
	});
});

bot.on('ready', async () => {
	console.log(`${bot.user.username} is online`);

	// Set game
	bot.user.setPresence({
		activity: { name: '_requestLeave/_endLeave | Creator: Jordy', type: 'WATCHING' },
		status: 'online'
	});
});

bot.on('message', async message => {
	// Check for ineligible messages and handle
	if (message.author.bot) return;
	if (message.partial) await message.fetch();

	const prefix = process.env.PREFIX;

	// Check to see if the message has the prefix
	if (!message.content.startsWith(prefix)) return;

	// Separate contents of message
	const messageArray = message.content.split(' ');
	const cmd = messageArray[0];
	const newCmd = cmd.toLowerCase();
	const args = messageArray.slice(1);

	// Get the file for the command
	const commandFile = bot.commands.get(newCmd.slice(prefix.length));

	if (commandFile) commandFile.run(bot, message, args);
});

// Keep the bot alive by sending console message to heroku
setTimeout(function wakeUp() {
	console.log('WAKE UP DYNO');
	return setTimeout(wakeUp, 120000);
}, 120000);

bot.login(process.env.DISCORD_TOKEN);
