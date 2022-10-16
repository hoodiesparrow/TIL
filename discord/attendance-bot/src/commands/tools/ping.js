const { SlashCommandBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Return my ping')
    .addStringOption((option) => 
      option.setName('subject')
        .setDescription('type in study subject')
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const { options } = interaction
    const studySubject = options.getString('subject')
    console.log(studySubject)

    const message = await interaction.deferReply({
      fetchReply: true,
    })

    const newMessage = `API Latency: ${client.ws.ping}\nClient Ping: ${message.createdTimestamp - interaction.createdTimestamp}`
    await interaction.editReply({
      content: newMessage
    })
  }
}