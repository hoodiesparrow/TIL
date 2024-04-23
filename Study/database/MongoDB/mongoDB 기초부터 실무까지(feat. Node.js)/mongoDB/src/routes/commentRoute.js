const { Router } = require('express')
const commentRouter = Router({ mergeParams: true })
const { Comment, Blog, User } = require('../models')
const { isValidObjectId } = require('mongoose')

commentRouter.post('/', async(req, res) => {
  try {
    const { blogId } = req.params
    const { content, userId } = req.body
    if (!isValidObjectId(blogId))
      return res.status(400).send({ error: 'blog ID is invalid' });
    if (!isValidObjectId(userId))
      return res.status(400).send({ error: 'user ID is invalid' });
    if (typeof content !== 'string')
      return res.status(400).send({ error: 'content is required' });

    const [blog, user] = await Promise.all([
      Blog.findById(blogId),
      User.findById(userId),
    ])

    if (!blog || !user)
      return res.status(400).send({ error: 'Blog or User does not exist' })
    if (!blog.isLive)
      return res.status(400).send({ error: 'Blog is not available' })
    
    const comment = new Comment({ content, user, blog })
    await comment.save()
    return res.send({ comment })
  } catch(err) {
    return res.status(500).send({ error: err.message })
  }
})
commentRouter.get('/', async(req, res) => {
  try {
    const { blogId } = req.params
    if (!isValidObjectId(blogId))
      return res.status(400).send({ error: 'Blog ID is not valid' })
    
    const comments = await Comment.find({ blog: blogId })
    return res.send({ comments })
  } catch(err) {
    return res.status(500).send({ error: err.message })
  }
})

module.exports = { commentRouter }