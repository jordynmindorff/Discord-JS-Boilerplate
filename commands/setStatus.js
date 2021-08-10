const Discord = require('discord.js');
const fs = require('fs');

module.exports.run = async (bot, message, args) => {
	const { channel, member } = message;

	await message.delete();
	const status = args.join(' ');

	if (!member.permissions.has(Discord.Permissions.ADMINISTRATOR)) {
		return channel.send({ content: 'Permission DENNNNNNNIEDDDD! Get dunked on 🏀!' });
	}

	fs.writeFileSync('currentStatus.txt', status);

	bot.user.setPresence({
		activities: [{ name: status, type: 'PLAYING' }],
		status: 'online',
	});
};

module.exports.name = 'setstatus';
