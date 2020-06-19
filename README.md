# Discord.js Bot Boilerplate Code - No DB, No Tests

## Info

### Prerequisites

- Have node.js installed (LTS Version Recommended, at least v12 required)
- Have git installed

### About

- I've been making bots for a while now, so I decided to make it easier for myself when I start a new project by making this. This is my first public git repo, and will probably be used by myself more than anyone.

- Credit goes to [{TheSourceCode}](https://www.youtube.com/watch?v=Z-tc91hArlM) for making a great tutorial series on discord.js bots that used a slightly different, but very similar, boilerplate to this. (Warning: This series is out of date)

- The [discord.js docs](https://discord.js.org/#/docs/main/stable/general/welcome) and the [discord.js guide](https://discordjs.guide/) are amazing resources, check them out!

## Usage

### Initial Setup / Install

Clone the repository:

```bash
git clone https://github.com/jordy337/Discord-JS-Boilerplate---No-DB.git
```

Install packages:

```bash
npm install
```

### Setup for Your Bot

#### Env Variables

- Change the name of `.env.example` to `.env`
- Set the `DISCORD_TOKEN` variable to your bot's token (**REMINDER: DO NOT SHARE THIS, THAT IS WHY `.env` IS GIT IGNORED BY DEFAULT**)
- Set the `PREFIX` variable to your desired prefix. (Ex: -, \_, !, etc.)

#### Misc Stuff

- Go into the `index.js` file, into the `ready` event.
  - Find the function param that says `'STATUS HERE'` and put your bot's status in the quotes.

#### Test it Out

- Run `npm run start` in the terminal for this folder
- If no errors are observed, you can move on to the next section
  - If you do see an error, check that your token is valid, or submit an issue on the repo
- If you feel adventurous, go take a look at the files to see what's going on

### Creating Your First Command

#### Command Structure

This boilerplate relies on a very consistent structure for command files, which can be seen below with comments to explain.

```js
const Discord = require('discord.js');

// This exported run function is what will be executed when the command is called

// Bot param: Discord.Client of command
// Message param: Discord.Message of command
// Args param: Array of args after command

module.exports.run = async (bot, message, args) => {
  // Destructure channel from message, identical to message.channel
  const { channel } = message;

  // Send a response in the channel
  await channel.send('Hi there!');
};

// Name of the command, this is what needs to be called after the prefix for the command to run. Lowercase mandatory.
module.exports.name = 'hello';
```

#### Making Your Own

- First, create a file in the ```commands/``` directory called ```commandNameHere.js```
- Copy and paste the following template:

```js
const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
  const { channel } = message;

  channel.send('Hi there!');
};

module.exports.name = 'commandnamelowercase';
```

- Write your command, save the file, run the bot and try it out!

Thanks for stopping by, star the repo if you like it and feel free to make PRs, always welcome feedback and/or learning moments.
