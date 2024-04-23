const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')
const fs = require('fs')

module.exports = (client) => {
  client.handleCommands = async() => {
    const commandFolders = fs.readdirSync(`./src/commands`)
    const { commands, commandArray } = client

    for (const folder of commandFolders) {
      const commandFiles = fs
        .readdirSync(`./src/commands/${folder}`)
        .filter((file) => file.endsWith('.js'))

      for (const file of commandFiles) {
        const command = require(`../../commands/${folder}/${file}`)
        commands.set(command.data.name, command)
        commandArray.push(command.data.toJSON())
        console.log(`command ${command.data.name} passed handler`)
      }
    }

    const clientId = '1030734470338322466'
    const guildId = '1029680981155774496'
    const rest = new REST({ version: '9' }).setToken(process.env.TOKEN)
    try {
      console.log('Started refreshing application (/) commands')
      await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
        body: commandArray,
      })
      console.log('Successfully reloaded application (/) commands')
    } catch (err) {
      console.error(err)
    }
  }
}