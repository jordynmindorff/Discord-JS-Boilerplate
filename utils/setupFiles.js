const fs = require('fs');

const setupFiles = (bot) => {
	fs.readdir('./commands/', (err, files) => {
		// If there's an error in reading the directory, log it
		if (err) console.log(err);

		// take the list of files and remove the js
		const jsFile = files.filter((f) => f.split('.').pop() === 'js');

		// If there are no files, return
		if (jsFile.length <= 0) {
			console.log("Couldn't find commands.");
			return;
		}

		// Add the files to commands
		jsFile.forEach((f, i) => {
			let props = require(`./commands/${f}`);
			console.log(`${f} loaded!`);
			bot.commands.set(props.name, props);
		});
	});
};

module.exports = {
	setupFiles,
};
