const express = require('express')
const fs = require('fs')
const app = express()
const os = require('os')
const path = require('path')

const port = process.env.PORT || 4200

const os_name = os.hostname()

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.get('/port', (req, res) => {
  res.send(`Score APP working on ${os_name} port ${port}`)
})

app.get('/', (req, res) => {
  res.send('This is the score')
})

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Authorization, Cache-Control, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers")
  next();
})

app.get('/add_score', (req, res) => {
  const username = req.query.username
  const word_to_guess = req.query.word
  const nb_try = req.query.nb_try
  const found = req.query.found
  res.send(addUserInformation(username, word_to_guess, nb_try, found))
})

function addUserInformation(username, word_to_guess, nb_try, found){
  const user_info_path = path.join(__dirname, 'data/user_info.json')
  const user_info_file = readJsonSync(user_info_path)
  const single_user_info =  user_info_file[username]

  single_user_info[word_to_guess] = {nb_try: parseInt(nb_try), found: (found=='true')}

  user_info_file[username] = single_user_info
  fs.writeFileSync(user_info_path, JSON.stringify(user_info_file, null, 4))
  
  return (`${username} infos have been UPDATED`)
}

app.get('/get_user_information', (req, res) => {
  const username = req.query.username
  res.send(getUserInformation(username))
});

function getUserInformation(username){
  const user_info_path = path.join(__dirname, 'data/user_info.json')
  const user_info_file = readJsonSync(user_info_path)
  return user_info_file[username]
}

function readJsonSync(filename_json){
  return JSON.parse(fs.readFileSync(filename_json))
}

app.get('/registerscore', (req, res) => {
  const username = req.query.username
  res.send(registerUserScore(username))
});

function registerUserScore(username){
  const user_info_path = path.join(__dirname, 'data/user_info.json')
  const user_info_file = readJsonSync(user_info_path)
  if (username == null){
      return ('Insert an Authorize Username')
  }
  user_info_file[username] = {};
  fs.writeFileSync(user_info_path, JSON.stringify(user_info_file, null, 4));
  return (`${username} SCORE has been Created`)
}