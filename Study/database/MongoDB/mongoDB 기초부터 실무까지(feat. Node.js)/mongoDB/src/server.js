const express = require('express')
const app = express()
const { userRouter, blogRouter } = require('./routes')
const mongoose = require('mongoose')
const MONGO_URI = 'mongodb+srv://admin:gyfhUCt8q8BwFjIK@mongodbtutorial.wuvui.mongodb.net/BlogService?retryWrites=true&w=majority'
const { generateFakeData } = require('../faker')

const server = async() => {
  try {
    let mongodbConnection = await mongoose.connect(MONGO_URI)
    // mongoose.set('debug', true)
    // generateFakeData(100, 10, 300)
    
    app.use(express.json())    
    app.use('/user', userRouter)
    app.use('/blog', blogRouter)

    app.listen(3000, () => console.log('server listening on port 3000'))
  } catch(err) {
    console.log(err)
  }
}

server()