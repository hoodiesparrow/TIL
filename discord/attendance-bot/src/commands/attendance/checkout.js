const { SlashCommandBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('checkout')
    .setDescription('공부 끝내기'),

  async execute(interaction, client) {
    const message = await interaction.deferReply({
      fetchReply: true,
    })

    const newMessage = `API Latency: ${client.ws.ping}\nClient Ping: ${message.createdTimestamp - interaction.createdTimestamp}`
    await interaction.editReply({
      content: newMessage
    })
  }
}