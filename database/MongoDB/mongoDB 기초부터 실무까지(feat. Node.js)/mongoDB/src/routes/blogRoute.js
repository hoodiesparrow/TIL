const { Router } = require('express')
const { append } = require('express/lib/response')
const { isValidObjectId } = require('mongoose')
const blogRouter = Router()
const { Blog, User } = require('../models')
const { commentRouter } = require('./commentRoute')

blogRouter.use('/:blogId/comment', commentRouter)

blogRouter.post('/', async(req, res) => {
  try {
    const { title, content, isLive, userId } = req.body
    if (typeof title !== 'string') 
      return res.status(400).send({ error: 'title is required' });
    if (typeof content !== 'string') 
      return res.status(400).send({ error: 'content is required' });
    if (isLive && typeof isLive !== 'boolean') 
      return res.status(400).send({ error: 'isLive must be a boolean' });
    if (typeof userId !== 'string') 
      return res.status(400).send({ error: 'user is required' });
    if (!isValidObjectId(userId)) 
      return res.status(400).send({ error: 'user ID is invalid' });

    let user = await User.findById(userId)
    if (!user) 
      return res.status(400).send({ error: 'user does not exist' });
    
    let blog = new Blog({ ...req.body, user: userId })
    await blog.save()
    return res.send({ blog })
  } catch(err) {
    console.log(err)
    return res.status(500).send({ error: err.message })
  }
})

blogRouter.get('/', async(req, res) => {
  try {
    const blogs = await Blog.find({})
    return res.send({ blogs })
  } catch(err) {
    console.log(err)
    return res.status(500).send({ error: err.message })
  }
})

blogRouter.get('/:blogId', async(req, res) => {
  try {
    const { blogId } = req.params
    if (!isValidObjectId(blogId))
      return res.status(400).send({ error: 'blog ID is invalid' });
    const blog = await Blog.findOne({ _id: blogId })
    return res.send({ blog })
  } catch(err) {
    console.log(err)
    return res.status(500).send({ error: err.message })
  }
})

blogRouter.put('/:blogId', async(req, res) => {
  try {
    const { blogId } = req.params
    if (!isValidObjectId(blogId))
      return res.status(400).send({ error: 'Blog ID is invalid ' });
    const { title, content } = req.body
    if (typeof title !== 'string') 
      return res.status(400).send({ error: 'title is required' });
    if (typeof content !== 'string') 
      return res.status(400).send({ error: 'content is required' });
    const blog = await Blog.findOneAndUpdate({ _id: blogId }, { title, content }, { new: true })
    return res.send({ blog })
  } catch(err) {
    console.log(err)
    return res.status(500).send({ error: err.message })
  }
})

blogRouter.patch('/:blogId/live', async(req, res) => {
  try {
    const { blogId } = req.params
    if (!isValidObjectId(blogId))
      return res.status(400).send({ error: 'blog ID is invalid' })

    const { isLive } = req.body
    if (typeof isLive !== 'boolean')
      return res.status(400).send({ error: 'isLive must be a boolean' })

    const blog = await Blog.findByIdAndUpdate(blogId, { isLive }, { new: true })
    return res.send({ blog })
  } catch(err) {
    console.log(err)
    return res.status(500).send({ error: err.message })
  }
})

module.exports = { blogRouter }