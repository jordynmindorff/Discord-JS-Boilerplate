const { PermissionFlagsBits, ActivityType } = require('discord.js');
const fs = require('fs');

module.exports.run = async (bot, message, args) => {
	// ! Notice how this command isn't as full-featured as the slash command version. That's because text-based commands are simply worse. Avoid using them.

	const { channel, member } = message;

	await message.delete();
	const status = args.join(' ');

	if (!member.permissions.has(PermissionFlagsBits.Administrator)) {
		return channel.send({ content: 'Permission DENIED! Get dunked on 🏀!' });
	}

	fs.writeFileSync('currentStatus.txt', 'Playing\r\nstatus');

	bot.user.setPresence({
		activities: [{ name: status, type: ActivityType.Playing }],
		status: 'online',
	});
};

module.exports.name = 'setstatus';
