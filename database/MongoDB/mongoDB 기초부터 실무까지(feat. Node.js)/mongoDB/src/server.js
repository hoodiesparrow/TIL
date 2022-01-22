const express = require('express')
const app = express()
const mongoose = require('mongoose')
const { User } = require('./models/User')
const MONGO_URI = 'mongodb+srv://admin:gyfhUCt8q8BwFjIK@mongodbtutorial.wuvui.mongodb.net/BlogService?retryWrites=true&w=majority'
const users = []

const server = async() => {
  try {
    let mongodbConnection = await mongoose.connect(MONGO_URI)
    
    app.use(express.json())
    
    app.get('/user', (req, res) => {
      // return res.send({users: users})
    })
    
    app.post('/user', async(req, res) => {
      try {
        let { username, name } = req.body
        if (!username) return res.status(400).send({error: "username is required"});
        if (!name || !name.first || !name.last) return res.status(400).send({error: "name is required"});
        const user = new User(req.body)
        await user.save()
        return res.send({user})
      } catch(err) {
        console.log(err)
        return res.status(500).send({error: err.message})
      }
    })
    
    app.listen(3000, () => console.log('server listening on port 3000'))
  } catch(err) {
    console.log(err)
  }
}

server()