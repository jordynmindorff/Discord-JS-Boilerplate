const Discord = require('discord.js');

module.exports = async (message, bot) => {
	// Check for ineligible messages and handle
	if (message.partial) message = await message.fetch();
	if (message.channel.type === 'DM') {
		return;
	} else {
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
	}
};
