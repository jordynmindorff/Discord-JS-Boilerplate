const fs = require('fs');
const { REST, Routes } = require('discord.js');

module.exports = (bot) => {
	const rest = new REST().setToken(process.env.DISCORD_TOKEN); // Initialize a REST client to interact directly with the API

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

		// Initialize empty array for API
		const commands = [];

		// Loop through each file
		jsFile.forEach(async (f, i) => {
			// Require command
			let command = require(`../slashCommands/${f}`);
			console.log(`${f} slash command loaded!`);

			// Make sure it has the right stuff
			if (command.run && command.options) {
				// Push options to array for API
				commands.push(command.options);

				// Set to slash command collection on bot
				bot.slashCommands.set(command.options.name, command);
			} else {
				console.log(`${f} missing either run function or options.`);
			}
		});

		// Send all commands to applications commands through API
		await rest.put(Routes.applicationCommands(process.env.APPLICATION_ID), {
			body: commands,
		});
	});
};
