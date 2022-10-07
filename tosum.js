const express = require('express')
const fs = require('fs')
const app = express()
const os = require('os')

const port = process.env.PORT || 3000

const seed = 777
const path = require('path')
const serve_static = require('serve-static')

const os_name = os.hostname()

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.get('/port', (req, res) => {
  res.send(`MOTUS APP working on ${os_name} port ${port}`)
})

app.get('/health', (req, res) => {
  console.log('healthcheck')
  res.send('ok')
})

app.use(serve_static('static', {index: ['home.html']}))

app.get('/word', (req, res) => {

  res.send(words[index_daily_word]);

})

const words = fs.readFileSync('../data/liste_francais_utf8.txt', {encoding:'utf8', flag:'r'}).split("\n")

var ms_in_day = 1000 * 60 * 60 * 24
var today = new Date()
var date = today.getTime()
var day_index = Math.floor(date / ms_in_day)
var index_daily_word = seed * day_index % words.length
