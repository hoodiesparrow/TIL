const { Schema, model } = require('mongoose')

const StudyingSchema = new Schema({
  name: { type: String, required: true },
  discordId: { type: String, required: true },
  subject: String,
  onAir: { type: Boolean, require: true },
  createdAt: { type: String, required: true },
})

module.exports = model('Studying', StudyingSchema)