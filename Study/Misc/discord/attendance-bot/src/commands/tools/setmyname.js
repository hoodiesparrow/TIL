const { SlashCommandBuilder } = require('discord.js')
const User = require('../../schemas/User')

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
    const { options, user: { id: discordId } } = interaction
    const name = options.getString('name')

    await interaction.deferReply({
      fetchReply: true,
      ephemeral: true,
    })

    await User.updateOne(
      { discordId },
      { $set: { name } },
      { upsert: true },
    )

    const content = `이름을 ${name}으로 수정했어`
    await interaction.editReply({
      content,
    })
  }
}