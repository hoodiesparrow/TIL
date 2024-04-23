const { Schema, model, Types } = require('mongoose')

const BlogSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  isLive: { type: Boolean, required: true, default: false },
  user: { type: Types.ObjectId, required: true, ref: 'user' },
}, { timestamps: true })

BlogSchema.virtual('comments', {
  ref: 'comment',
  localField: '_id',
  foreignField: 'blog'
})

BlogSchema.set('toObject', { virtuals: true })
BlogSchema.set('toJson', { virtuals: true })


const Blog = model('blog', BlogSchema)

module.exports = { Blog }