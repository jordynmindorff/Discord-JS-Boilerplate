const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
	const { channel } = message;

	channel.send('Hi there!');
};

module.exports.name = 'hello';
