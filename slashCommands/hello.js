// Just as with message-based commands, this is the function to be invoked when the command is ran.
// The command is given the interaction object as well as the Client object (bot).
module.exports.run = async (bot, interaction) => {
	// Here you could do whatever you'd like with the information the interaction object has provided you, like message options.

	// interaction.editReply() creates a reply message to the command and accepts all message parameters as per any message with discord.js
	// We have to use editReply rather than just reply because we deferred the reply earlier just in case it took a while to respond
	await interaction.editReply({
		content: 'Hi! You ran a slash command to get this response, good job!',
	});
};

// These options are what the discord API is sent to create the command. The two most common ones are a name and a description, but there are others.
// You can visit the setStatus.js file to see how options might be passed. But visit the discord.js guide for real tutorials!
module.exports.options = {
	name: 'hello',
	description: 'Say hello to the bot, get a reply!',
};
