const fs = require('fs');

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

	fs.readdir('./slashCommands/', (err, files) => {
		// If there's an error in reading the directory, log it
		if (err) return console.log(err);

		// take the list of files and remove the js
		const jsFile = files.filter((f) => f.split('.').pop() === 'js');

		// If there are no files, return
		if (jsFile.length <= 0) {
			console.log("Couldn't find commands.");
			return;
		}

		// Add the files to slashCommands collection
		jsFile.forEach(async (f, i) => {
			let command = require(`../slashCommands/${f}`);
			console.log(`${f} slash command loaded!`);

			const commands = await bot.application.commands.fetch(); // Fetches all commands already registered
			const preExisting = commands.find((c) => c.name === command.options.name); // Find already registered command (if applicable)

			if (preExisting) {
				preExisting.description !== command.options.description ||
				(command.options.options &&
					preExisting.options.length !== command.options.options?.length)
					? preExisting.edit(command.options)
					: null; // If already registered, update it w/ any changes if there are any
				bot.slashCommands.set(command.options.name, command);
			} else {
				bot.application.commands.create(command.options); // Registers all as global commands. Guild-specific command would be bot.guilds.cache.get(ID_HERE).commands.create(...)
				bot.slashCommands.set(command.options.name, command);
			}
		});
	});
};
