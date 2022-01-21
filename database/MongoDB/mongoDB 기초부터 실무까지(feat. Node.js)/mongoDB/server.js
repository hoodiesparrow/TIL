const express = require('express')
const app = express()

app.use(express.json())

const users = []

app.get('/user', (req, res) => {
  return res.send({users: users})
})

app.post('/user', (req, res) => {
  users.push({name: req.body.name, age: req.body.age})
  return res.send(true)
})

app.listen(3000, () => console.log('server listening on port 3000'))