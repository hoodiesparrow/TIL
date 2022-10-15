require('dotenv').config()
const { TOKEN } = process.env
const { Client, Collection, GatewayIntentBits } = require('discord.js')
const fs = require('fs')

const client = Client({ intents: GatewayIntentBits.Guilds })
client.commands = new Collection()

const functionFolders = fs.readdirSync(`./src/functions`)
for (const folder of functionFolders) {
  const functionsFiles = fs
  .readdirSync(`./src/functions/${folder}`)
  .filter((file) => file.endsWith('.js'))
  for (const file of functionsFiles) {
    require(`.functions/${folder}/${file}`)(client)
  }
}

