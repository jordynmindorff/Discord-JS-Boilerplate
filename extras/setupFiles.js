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
};
