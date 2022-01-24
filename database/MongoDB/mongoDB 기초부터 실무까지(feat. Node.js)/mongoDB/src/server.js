const express = require('express')
const app = express()
const { userRouter } = require('./routes/userRoute')
const mongoose = require('mongoose')
const MONGO_URI = 'mongodb+srv://admin:gyfhUCt8q8BwFjIK@mongodbtutorial.wuvui.mongodb.net/BlogService?retryWrites=true&w=majority'

const server = async() => {
  try {
    let mongodbConnection = await mongoose.connect(MONGO_URI)
    mongoose.set('debug', true)
    
    app.use(express.json())    
    app.use('/user', userRouter)

    app.listen(3000, () => console.log('server listening on port 3000'))
  } catch(err) {
    console.log(err)
  }
}

server()