const { SlashCommandBuilder } = require('discord.js')
const Studying = require('../../schemas/Studying')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('end')
    .setDescription('공부 끝내기'),

  async execute(interaction, client) {
    const { user: { id: discordId } } = interaction

    let content = ''
    let ephemeral;
    const studying = await Studying.findOne({ discordId })
    if (!studying) {
      content = '먼저 공부를 시작해! /checkin'
      ephemeral = true
    }
    if (studying) {
      const { name, subject, createdAt } = await Studying.findOne({ discordId })
      // console.log(
      //   `name: ${name}, subject: ${subject}, time: ${createdAt}`
      // )
      await Studying.deleteMany({ discordId })
      content = '공부 끝! 고생했어'
      ephemeral = false
    }
    await interaction.deferReply({ 
      fetchReply: true,
      ephemeral,
    })

    await interaction.editReply({ 
      content,
      ephemeral,
    })
  }
}