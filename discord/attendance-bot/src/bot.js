require('dotenv').config()
const { TOKEN, DBTOKEN } = process.env
const { Client, Collection, GatewayIntentBits } = require('discord.js')
const { connect } = require('mongoose')
const fs = require('fs')

const client = new Client({ intents: GatewayIntentBits.Guilds })
client.commands = new Collection()
client.commandArray = []
const functionFolders = fs.readdirSync(`./src/functions`)
for (const folder of functionFolders) {
  const functionsFiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((file) => file.endsWith('.js'))
  for (const file of functionsFiles) {
    require(`./functions/${folder}/${file}`)(client)
  }
}

client.handleEvents();
client.handleCommands();
client.login(TOKEN);

(async () => {
  await connect(DBTOKEN).catch(console.error);
})();