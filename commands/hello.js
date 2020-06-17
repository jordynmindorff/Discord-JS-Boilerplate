const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
	const { channel } = message;

	channel.send('hey');
};

module.exports.name = 'hey';
