const fs = require('fs');
const setupFiles = require('../functions/setupFiles');
const { ActivityType } = require('discord.js');

module.exports = (bot) => {
	console.log(`${bot.user.username} is online`);
	const statusInFile = fs.readFileSync('currentStatus.txt', 'utf-8');
	let status;
	let type;

	const arr = statusInFile.split(/\r?\n/);
	type = arr[0];
	status = arr[1];

	// Setup Command Files and Collection
	setupFiles(bot);

	// Set game
	bot.user.setPresence({
		activities: [{ name: status, type: ActivityType[type] }],
		status: 'online',
	});
};
