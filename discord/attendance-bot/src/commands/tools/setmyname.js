const { SlashCommandBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setmyname')
    .setDescription('출석표 이름 변경하기')
    .addStringOption((option) => 
      option.setName('name')
        .setDescription('변경할 이름')
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const { options } = interaction
    const username = options.getString('username')
    console.log(username)

    const message = await interaction.deferReply({
      fetchReply: true,
    })

    const newMessage = `API Latency: ${client.ws.ping}\nClient Ping: ${message.createdTimestamp - interaction.createdTimestamp}`
    await interaction.editReply({
      content: newMessage
    })
  }
}