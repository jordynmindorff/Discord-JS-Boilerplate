const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');

module.exports = (bot) => {
	fs.readdir('./commands/', (err, files) => {
		// If there's an error in reading the directory, log it
		if (err) return console.log(err);

		// take the list of files and remove the js
		const jsFile = files.filter((f) => f.split('.').pop() === 'js');

		// If there are no files, return
		if (jsFile.length <= 0) {
			console.log("Couldn't find commands.");
			return;
		}

		// Add the files to commands
		jsFile.forEach((f, i) => {
			let command = require(`../commands/${f}`);
			console.log(`${f} loaded!`);

			if (typeof command.name === 'string') {
				bot.commands.set(command.name, command);
			} else if (typeof command.name === 'object') {
				command.name.forEach((name) => {
					bot.commands.set(name, command);
				});
			}
		});
	});

	fs.readdir('./slashCommands/', async (err, files) => {
		// If there's an error in reading the directory, log it
		if (err) return console.log(err);

		// take the list of files and remove the js
		const jsFile = files.filter((f) => f.split('.').pop() === 'js');

		// If there are no files, return
		if (jsFile.length <= 0) {
			console.log("Couldn't find commands.");
			return;
		}

		// Initialize the REST client
		const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

		// Get all currently registered commands
		const currentCommands = await rest.get(
			Routes.applicationCommands(process.env.APPLICATION_ID)
		);

		// Add the files to slashCommands collection
		jsFile.forEach(async (f, i) => {
			let command = require(`../slashCommands/${f}`);
			console.log(`${f} slash command loaded!`);

			const preExisting = currentCommands.find((c) => c.name === command.options.name); // Find already registered command (if applicable)

			const preExistingIndex = currentCommands.findIndex(
				(c) => c.name === command.options.name
			); // Get index
			currentCommands.splice(preExistingIndex, 1); // Remove from array

			// If already registered, update it w/ any changes if there are any
			if (preExisting) {
				if (
					preExisting.description !== command.options.description ||
					(command.options.options &&
						preExisting.options?.length !== command.options.options?.length) ||
					preExisting.default_member_permissions !==
						command.options?.default_member_permissions ||
					preExisting.dm_permission !== command.options?.dm_permission
				) {
					await rest.patch(
						Routes.applicationCommand(preExisting.application_id, preExisting.id),
						{ body: command.options }
					);
				}

				// Set to slash command collection on bot
				bot.slashCommands.set(command.options.name, command);
			} else {
				await rest.post(Routes.applicationCommands(process.env.APPLICATION_ID), {
					body: command.options,
				}); // Registers as global command

				// Set to slash command collection on bot
				bot.slashCommands.set(command.options.name, command);
			}
		});

		// File has been deleted, delete command
		currentCommands.forEach(async (v, i) => {
			await rest.delete(Routes.applicationCommand(v.application_id, v.id));
		});
	});
};
