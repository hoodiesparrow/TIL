const { SlashCommandBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('checkin')
    .setDescription('공부 시작하기')
    .addStringOption((option) => 
      option.setName('subject')
        .setDescription('공부 주제')
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