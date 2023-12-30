const fs = require('fs');
const { ApplicationCommandOptionType, PermissionFlagsBits, ActivityType } = require('discord.js');

module.exports.run = async (bot, interaction) => {
	const status = interaction.options.getString('status');
	const activityType = interaction.options.getInteger('type');
	let activityName;

	switch (activityType) {
		case 0:
			activityName = 'Playing';
			break;

		case 1:
			activityName = 'Streaming';
			break;

		case 2:
			activityName = 'Listening';
			break;

		case 3:
			activityName = 'Watching';
			break;

		case 5:
			activityName = 'Competing';
			break;

		default:
			activityName = 'Playing';
	}

	fs.writeFileSync('currentStatus.txt', `${activityName}\r\n${status}`);

	bot.user.setPresence({
		activities: [{ name: status, type: activityType }],
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
			type: ApplicationCommandOptionType.String,
			name: 'status', // Name of the option visible to the user
			description: "Message to be set as the bot's status.",
			required: true, // MUST be provided
		},
		{
			type: ApplicationCommandOptionType.Integer,
			name: 'type',
			description: 'The type of status to be set.',
			choices: [
				// This is how we allow only certain choices for options
				{ name: 'Competing in...', value: ActivityType.Competing },
				{ name: 'Playing...', value: ActivityType.Playing },
				{ name: 'Listening to...', value: ActivityType.Listening },
				{ name: 'Watching...', value: ActivityType.Watching },
			],
			required: true,
		},
	],
	default_member_permissions: String(PermissionFlagsBits.Administrator), // Sets the default permission such that only administrators can run the command
	dm_permission: false, // Ensures the command may not be run in DMs
};
