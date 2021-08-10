const fs = require('fs');
const setupFiles = require('../functions/setupFiles');

module.exports = (bot) => {
	console.log(`${bot.user.username} is online`);
	const statusInFile = fs.readFileSync('currentStatus.txt').toString();

	// Setup Command Files and Collection
	setupFiles(bot);

	// Set game
	bot.user.setPresence({
		activities: [{ name: statusInFile, type: 'PLAYING' }],
		status: 'online',
	});
};
