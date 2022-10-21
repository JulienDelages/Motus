const express = require('express')
const fs = require('fs')
const app = express()
const os = require('os')
const path = require('path')

const port = process.env.PORT || 4000

const os_name = os.hostname()

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.get('/port', (req, res) => {
  res.send(`TOSUM APP working on ${os_name} port ${port}`)
})

app.use('/static', express.static('static'))

app.get('/', (req, res) => {
    main_path = path.join(__dirname, 'static/login.html')
    res.sendFile(main_path)
})

app.get('/tosum', (req, res) => {
  main_path = path.join(__dirname, 'static/tosum.html')
  res.sendFile(main_path)
})

app.get('/score', (req, res) => {
  score_path = path.join(__dirname, 'static/score.html')
  res.sendFile(score_path)
})

app.get('/register', (req, res) => {
  score_path = path.join(__dirname, 'static/register.html')
  res.sendFile(score_path)
})

app.get('/word', (req, res) => {
  res.send(words[index_daily_word]);
})

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Authorization, Cache-Control, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers")
  next();
})

const words = fs.readFileSync('data/liste_francais_utf8.txt', {encoding:'utf8', flag:'r'}).split("\n")
const seed = 777
var ms_in_day = 1000 * 60 * 60 * 24
var today = new Date()
var date = today.getTime()
var day_index = Math.floor(date / ms_in_day)
var index_daily_word = seed * day_index % words.length