const fs = require('fs');
const Discord = require('discord.js');

module.exports.run = async (bot, interaction) => {
	const { member } = interaction;

	const status = interaction.options.getString('status');

	if (!member.permissions.has(Discord.Permissions.ADMINISTRATOR)) {
		return await interaction.reply('Permission DENNNNNNNIEDDDD! Get dunked on 🏀!');
	}

	fs.writeFileSync('currentStatus.txt', status);

	bot.user.setPresence({
		activities: [{ name: status, type: 'PLAYING' }],
		status: 'online',
	});

	await interaction.reply({ content: 'Done!' });
};

// Example of command setup with a provided argument. See discord.js documentation for details on doing this with other types of arguments.
module.exports.options = {
	name: 'setstatus',
	description: 'Set the status message of the bot using the command argument.',
	options: [
		{
			type: 'STRING',
			name: 'status',
			description: "Message to be set as the bot's status.",
			required: true,
		},
	],
};
