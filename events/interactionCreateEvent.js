module.exports = async (interaction, bot) => {
	// Stop if not command interaction
	if (!interaction.isCommand()) return;

	// Defer reply until later because process could take a while -- some commands reply w/ ephemeral and that needs to be set on the defer
	// Ephmeral means a message only the user who ran the command can see
	switch (interaction.commandName) {
		case 'setstatus':
			await interaction.deferReply({ ephemeral: true });
			break;

		default:
			await interaction.deferReply();
			break;
	}

	// Get the file for the command
	const commandFile = bot.slashCommands.get(interaction.commandName);

	// Run the command
	if (commandFile) commandFile.run(bot, interaction);
};
