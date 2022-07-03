const readyEvent = require('./readyEvent');
const messageCreateEvent = require('./messageCreateEvent');
const interactionCreateEvent = require('./interactionCreateEvent');

module.exports = (bot) => {
	bot.on('ready', () => {
		readyEvent(bot);
	});

	bot.on('messageCreate', (message) => {
		messageCreateEvent(message, bot);
	});

	bot.on('interactionCreate', (interaction) => {
		interactionCreateEvent(interaction, bot);
	});
};
