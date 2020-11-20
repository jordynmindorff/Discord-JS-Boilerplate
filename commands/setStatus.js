const Discord = require('discord.js');
const fs = require('fs');

module.exports.run = async (bot, message, args) => {
	const { channel, member } = message;

	await message.delete();
	const status = args.join(' ');

	if (!message.member.hasPermission('ADMINISTRATOR')) {
		return channel.send('Permission DENNNNNNNIEDDDD! Get dunked on 🏀!');
	}

	fs.writeFileSync('currentStatus.txt', status);

	bot.user.setPresence({
		activity: { name: status, type: 'PLAYING' },
		status: 'online',
	});
};

module.exports.name = 'setstatus';
