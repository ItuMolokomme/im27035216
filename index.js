const express = require('express')
const mongoose = require('mongoose')
const app = express()
const bcrypt = require('bcrypt')
const connstring = 'mongodb+srv://imolokomme:MBCOoKIRT1qtYKYu@cluster0.vk7vpzm.mongodb.net/'
mongoose.connect(connstring, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() =>{
    console.log('Connected successfully')
})
.catch(error => {
    console.error('Connection failed', error)
})
const User = require('./Models/users')
app.use(express.json()) //Middleware
const saltRounds = 10; // Number of salt rounds

app.post('/createaccount', (req, res) => {
    bcrypt.hash(req.body.password, saltRounds)
    .then(hash => {
      const user = new User({
        name: req.body.name,
        surname: req.body.surname,
        username: req.body.username,
        password: hash,
        email: req.body.email
      });
      user.save()
        .then(result => {
          res.status(201).json({ message: 'User saved successfully with encryption', result: result });
        })
        .catch(error => {
          res.status(500).json({ error: 'Failed' });
        });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Failed to hash password' });
    });
});

module.exports = app;