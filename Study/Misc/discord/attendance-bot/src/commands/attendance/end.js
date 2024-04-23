require('dotenv').config()
const { SlashCommandBuilder } = require('discord.js')
const Studying = require('../../schemas/Studying')
const { NOTIONTOKEN, NOTIONDBTOKEN } = process.env
const { Client } = require('@notionhq/client')
const notion = new Client({ auth: NOTIONTOKEN })

const calcDuration = (start) => {
  const diff = new Date().getTime() - new Date(start).getTime()
  const SECOND = 1000 * 60

  const totalMinutes = parseInt(diff / SECOND)
  const hours = parseInt(totalMinutes / 60)
  const minutes = parseInt(totalMinutes % 60)

  return `${hours && (hours + '시간 ') || ''}${minutes + '분'}`
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('end')
    .setDescription('공부 끝내기'),

  async execute(interaction, client) {
    const { user: { id: discordId } } = interaction

    let content = ''
    let ephemeral;
    const studying = await Studying.findOne({ discordId, onAir: true })
    if (!studying) {
      content = '먼저 공부를 시작해! (๑•̀ㅁ•́ฅ) /start'
      ephemeral = true
    }
    if (studying) {
      const { name, subject, createdAt } = await Studying.findOne({ discordId, onAir: true })

      await notion.pages.create({
        parent: {
          database_id: NOTIONDBTOKEN,
        },
        properties: {
          Name: {
            title: [
              {
                text: {
                  content: name,
                },
              },
            ],
          },
          Subject: {
            rich_text: [
              {
                text: {
                  content: subject ?? '자유주제',
                },
              },
            ],
          },
          Duration: {
            rich_text: [
              {
                text: {
                  content: calcDuration(createdAt),
                },
              },
            ],
          },
          Date: {
            date: {
              start: new Date(new Date(createdAt).getTime() + 540 * 60000 ).toISOString(), // 노션 버그인가???
              time_zone: 'Asia/Seoul',
            }
          },
          ID: {
            rich_text: [
              {
                text: {
                  content: discordId,
                }
              }
            ]
          },
        },
      });



      await Studying.findOneAndUpdate({ discordId, onAir: true }, { onAir: false })
      content = '공부 끝! 고생했어 (ฅ•.•ฅ)'
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
