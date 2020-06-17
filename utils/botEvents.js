const Discord = require('discord.js');

const readyEvent = (bot, status) => {
	console.log(`${bot.user.username} is online`);

	// Set game
	bot.user.setPresence({
		activity: { name: status, type: 'PLAYING' },
		status: 'online',
	});
};

const messageEvent = (message, bot) => {
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
};

module.exports = {
	readyEvent,
	messageEvent,
};
