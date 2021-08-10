// This exported run function is what will be executed when the command is called
// The bot param is a Discord.Client type, the message param is the Discord.Message that contained the command, and the args param is an array of arguments after the command, split by spaces in ../events/messageEvent
module.exports.run = async (bot, message, args) => {
	// Destructure channel from message, identical to message.channel
	const { channel } = message;

	// Send a response in the channel with message content (text)
	await channel.send({ content: 'Hi there!' });
};

// Name of the command, this is what needs to be called after the prefix for the command to run
module.exports.name = ['hello', 'goodbye', 'bye'];
