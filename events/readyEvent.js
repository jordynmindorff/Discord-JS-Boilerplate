const fs = require('fs');

module.exports = (bot) => {
	console.log(`${bot.user.username} is online`);
	let statusInFile = fs.readFileSync('currentStatus.txt').toString();

	// Set game
	bot.user.setPresence({
		activity: { name: statusInFile, type: 'PLAYING' },
		status: 'online',
	});

	bot.emit('leaderboardUpdateRequested', bot);
};
