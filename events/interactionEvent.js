module.exports = async (interaction, bot) => {
	// Return out of event handle if the interaction is not a command being called.
	if (!interaction.isCommand()) return;

	// Get the file for the command
	const commandFile = bot.slashCommands.get(interaction.commandName);

	// Run the command.
	if (commandFile) commandFile.run(bot, interaction);
};
