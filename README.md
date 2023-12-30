# Discord.js Bot Boilerplate Code - No Database, No Testing

## Info

### Prerequisites

-   Have node.js installed (Discord.js V14+ REQUIRES Node v16.11.0 or higher)
-   Have git installed

### About

-   I've been making bots for a while now, so I decided to make it easier for myself when I start a new project by making this. This is my first public git repo, and will probably be used by myself more than anyone. Nonetheless, if you want to use it for yourself or even contribute, be my guest.

-   I've drawn ideas for this structure and layout from many different sources over time, many of which are now severely outdated, so I won't bother listing them all.

-   Many people would probably disagree with the way I implement things with this boilerplate, and they're probably right. I didn't focus on efficiency or following conventions to the absolute strictest definitions, I wanted to make something readable, simple, and developer-friendly. So, I did that in the way that made the most sense to me, doesn't mean everybody will think the same way.

-   The [discord.js docs](https://discord.js.org/#/docs/main/stable/general/welcome) and the [discord.js guide](https://discordjs.guide/) are amazing resources, check them out! They are absolute must reference materials when using discord.js, and I still reference them at least every 30 mins when working on a bot (primarily the docs, which give you all of the classes and there properties, methods, etc.).

## Usage

### Discord Bot Application, Intents, Etc.

#### Initial Setup Steps

1. To create a discord bot, you must create an application through the discord developer portal. You may do so [here](https://discord.com/developers/applications). ![Image of discord portal](/images/discordSetup1.png "This is what you'll see upon visiting that link and signing in and where you'll access all discord applications.")
2. Click on the indicated button in the above image ("New Application") and give it a name and press create. ![Image of application creation popup](/images/discordSetup2.png 'Enter a name and click create, this initializes your application.')
3. You can edit the name, icon, description, etc. upon entering, but we care about the "Bot" section that can be found in the side menu. Go there and click "Add Bot." ![Image of discord portal bot menu](/images/discordSetup3.png 'Click the button, create the bot!')
4. Now that you have created the bot, you should probably update its discord username and profile picture if you want. But now, the finer details. Configure the bot permission and Privileged Gateway Intents selectors as necessary (**see below sub-sections on these topics**). ![Image of configuration menu](/images/discordSetup4.png 'Decide what permissions and intents you need.')
5. Now move to the OAuth2 page, select "bot" in the URL Generator section, re-enter your permissions necessary and copy the link provided. ![Image of OAuth2 URL Generator Menu](/images/discordSetup5.png 'Generate your invite URL.')
6. Visit the URL you generated in the previous step and invite the bot to a server where you want to use it an have permission to do so.

#### Bot Permissions

Bots are like any other discord server/guild member in that they are assigned specific roles and permissions to go along with that role. Depending on what your bot will do, you should decide what type of permissions to give it. I'd say the most common decision to go with here is the "Administrator" permission. HOWEVER, BE AWARE, this should only be given if you really trust the bot and want it to have full access to all permissions, channels, etc. in all servers it enters. It is frowned upon to give this permission when unnecessary.

#### Privileged Gateway Intents

This is a somewhat new concept for the discord API. All bots receive events through something called the "Gateway," which, for the most part, you don't need to worry about. However, in discord.js, we use "Intents" to declare what events we want our bots to access. For example, the `MessageContent` intent allows us to access the messages sent in guilds and recieve the `messageCreate` event.

Now, the decision here comes with the 'privileged' part. Some intents are called privileged because they grant access to potentially sensitive information. They are the `GuildPresences` intent, the `MessageContent` intent, and `GuildMembers` intents. If your bot will need to access this data, click the checkmarks next to them in the discord application panel where you configured/created your bot. Be aware, if your bot is in over 100 servers some day, you will need to get verification from discord to be allowed this access.

Read a lot more about this topic written by much smarter and more knowledgeable people [here](https://discordjs.guide/popular-topics/intents.html#privileged-intents). **You will also want to read this to decide what intents to initialize the bot with in the `index.js` file. I gave it quite a few by default.**

_A Warning:_ While I include text-based commands in this boilerplate, I do not recommend you make any substantial use of them for any new project. The only 'correct' way to make commands is now with slash-commands. If you intent to use text-based commands, you will _need_ the `MessageContent` privileged intent which isn't ideal.

### Setup / Install of Codebase

Clone the repository:

```bash
git clone https://github.com/jordynmindorff/Discord-JS-Boilerplate.git
```

Install packages:

```bash
npm install
```

### Setup for Your Bot

#### Env Variables

-   Change the name of `.env.example` to `.env`
-   Set the `DISCORD_TOKEN` variable to your bot's token (**REMINDER: DO NOT SHARE THIS, THAT IS WHY `.env` IS GIT IGNORED BY DEFAULT, IT WON'T BE SHARED**)
-   Set the `PREFIX` variable to your desired prefix. (Ex: -, \_, !, etc.)
-   Set the `APPLICATION_ID` variable to the application id number on the "General Information" tab of your bot's application in the discord developer panel you used to setup the bot before. Don't worry, this one doesn't need to be as secret. See this: ![Image of discord portal application menu](/images/discordSetup6.png 'Copy the application id!')

#### Misc Stuff

-   Open the `currentStatus.txt` file
    -   Replace the text in this file with the status you want your bot to have.
    -   Note: The status can be updated with `{PREFIX}setStatus STATUSHERE` OR the `/setstatus status:StatusHere` slash command as I have added it as a pre-packaged command.

#### Test it Out

-   Run `npm run start` in the terminal for this folder
-   If no errors are observed, you can move on to the next section
    -   If you do see an error, check that your token is valid, seek help (the discord.js server is a great place), or submit an issue on this repo.
-   If you feel adventurous, go take a look at the files to see what's going on

### Creating Commands

Be aware, this boilerplate setup supports two different kinds of commands. Slash commands, and message commands. See the comments in the command files for specific examples/information.

#### Slash Commands

-   Slash commands are ran by using discord's built in menu for these commands and are preferred.
    -   Visit the `slashCommands` folder and `hello.js` or `setStatus.js` to see the command structure.
    -   Slash commands run off of something called discord interactions. Read all about them [here](https://discordjs.guide/interactions/slash-commands.html#registering-slash-commands) in the guide. All commands through the model in this repo are global commands.
    -   There are also other types of interactions that allow more integration into discord through context menus, but this is not included in this boilerplate.
-   In slash commands, the biggest thing to keep in mind is the options and permissions structure.
    -   This structure in action may be seen in the files included in this repo. For all option types, refer to [this resource](https://discord-api-types.dev/api/discord-api-types-v10/enum/ApplicationCommandOptionType).
    -   In the command file, you will also see `default_member_permissions`. This sets out the default visibility of the command to those with the specified permissions. To see the rest of the permissions flags ass shown in `setStatus.js`, see [this](https://discord-api-types.dev/api/discord-api-types-payloads/common#PermissionFlagsBits).

_A Warning:_ New global commands can sometimes take a while to be processed and appear in discord. Likewise for deleting them.

#### Message Commands

-   Message commands are pretty self explanatory -- you send a message in chat with a prefix and a command in run. This is the classic style.
-   Be aware, this is not Discord's preferred way of handling commands and is discouraged.
-   All permissions/options must be handled manually.

### Hosting

Hosting is a very complex topic, but for a basic project all you need is something that can keep your node application ticking 24/7. I used to use **Heroku**, but they now charge. I'm not too sure what's out there for free services these days.

As my projects have evolved into more complex beasts, I host using a Linux Virtual Private Server (VPS) with **DigitalOcean**.

### The End

Good luck! Thanks for stopping by, star the repo if you like it, and feel free to make PRs. I always welcome feedback and/or learning opportunities.
