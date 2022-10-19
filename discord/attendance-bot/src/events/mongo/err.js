module.exports = {
  name: 'err',
  execute(err) {
    console.log(`An error occured when connecting to DB: ${err}`)
  }
}