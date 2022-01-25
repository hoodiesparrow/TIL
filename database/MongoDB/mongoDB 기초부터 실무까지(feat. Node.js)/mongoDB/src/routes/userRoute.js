const mongoose = require('mongoose')
const { User } = require('../models')
const { Router } = require('express')
const userRouter = Router()

    
userRouter.get('/', async(req, res) => {
  try {
    const users = await User.find({})
    return res.send({ users })
  } catch(err) {
    return res.status(500).send({ error: err.message })
  }
})

userRouter.get('/:userId', async(req, res) => {
  try {
    const { userId } = req.params
    if (!mongoose.isValidObjectId(userId)) return res.status(400).send({ error: 'Invalid User ID'});
    const user = await User.findOne({ _id: userId })
    return res.send({ user })
  } catch(err) {
    console.log(err)
    return res.status(500).send({ error: err.message })
  }
})

userRouter.post('/', async(req, res) => {
  try {
    let { username, name } = req.body
    if (!username) return res.status(400).send({ error: "username is required" });
    if (!name || !name.first || !name.last) return res.status(400).send({ error: 'name is required' });
    const user = new User(req.body)
    await user.save()
    return res.send({ user })
  } catch(err) {
    console.log(err)
    return res.status(500).send({ error: err.message })
  }
})

userRouter.delete('/:userId', async(req, res) => {
  try {
    const { userId } = req.params
    if (!mongoose.isValidObjectId(userId)) return res.status(400).send({ error: 'Invalid User ID'});
    const user = await User.findOneAndDelete({ _id: userId })
    return res.send({ user })
  } catch(err) {
    return res.status(500).send({ error: err.message })
  }
})

userRouter.put('/:userId', async(req, res) => {
  try {
    const { userId } = req.params
    if (!mongoose.isValidObjectId(userId)) return res.status(400).send({ error: 'Invalid User ID' })
    const { age, name } = req.body
    if (!age && !name) return res.status(400).send({ error: 'age or name is required' })
    if (age && typeof age !== 'number') return res.status(400).send({ error: 'age must be a number'})
    if (name && typeof name.first !== 'string' && typeof name.last !== 'string') return res.status(400).send({ error: 'first and last name should be string'})
    // let updateBody = {}
    // if (age) updateBody.age = age;
    // if (name) updateBody.name = name;
    // const user = await User.findByIdAndUpdate(userId, { $set: updateBody }, { new: true })
    let user = await User.findById(userId)
    if (age) user.age = age;
    if (name) user.name = name;
    await user.save()
    return res.send({ user })
  } catch(err) {
    return res.status(500).send({ error: err.message })
  }
})

module.exports = {
  userRouter
}