const readyEvent = require('./readyEvent');
const messageEvent = require('./messageEvent');
const interactionEvent = require('./interactionEvent');

module.exports = (bot) => {
	bot.on('ready', () => {
		readyEvent(bot);
	});

	bot.on('messageCreate', (message) => {
		messageEvent(message, bot);
	});

	bot.on('interactionCreate', (interaction) => {
		interactionEvent(interaction, bot);
	});
};
