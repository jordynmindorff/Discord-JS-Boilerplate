const fs = require('fs');
const Discord = require('discord.js');

module.exports.run = async (bot, interaction) => {
	const status = interaction.options.getString('status');

	fs.writeFileSync('currentStatus.txt', status);

	bot.user.setPresence({
		activities: [{ name: status, type: 'PLAYING' }],
		status: 'online',
	});

	// Will be an ephmeral reply because the deferReply was set to have this behaviour in the interactionCreate event
	// In other words, only the person who ran this command will see this message thanks to what was setup in events/interactionCreateEvent.js
	await interaction.editReply({ content: 'Done!' });
};

// Example of command setup with a provided argument. See discord.js documentation for details on doing this with other types of arguments.
module.exports.options = {
	name: 'setstatus',
	description: 'Set the status message of the bot using the command argument.',
	options: [
		{
			type: 3, // 3 is a string argument
			name: 'status',
			description: "Message to be set as the bot's status.",
			required: true, // MUST be provided
		},
	],
	default_member_permissions: String(Discord.Permissions.FLAGS.ADMINISTRATOR), // Sets the default permission such that only administrators can run the command
	dm_permission: false, // Ensures the command may not be run in DMs
};
