const readyEvent = require('./readyEvent');
const messageEvent = require('./messageEvent');

module.exports = (bot) => {
	bot.on('ready', () => {
		readyEvent(bot);
	});

	bot.on('message', (message) => {
		messageEvent(message, bot);
	});
};
