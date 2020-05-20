const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const generator = require('generate-password')
require('dotenv').config();
const nodemailer = require('nodemailer');
const alert = require('alert')

const User = require('../model/User')
users.use(cors())

process.env.SECRET_KEY = 'secret'

const transporter = nodemailer.createTransport({
  host: "smtp.mailbox.org",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
})

users.post('/instReg', (req, res) => {
  const today = new Date()
  const passwordCheckGen = generator.generate({
    length: 10,
    numbers: true
  })
  const passwordCheck = bcrypt.hashSync(passwordCheckGen, 10)
  const role = "Institution Staff"
  const userData = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    institution_name: req.body.institution_name,
    passwordCheckGen: passwordCheckGen,
    passwordCheck: passwordCheck,
    created: today,
    role: role
  }

  User.findOne({
    institution_name: req.body.institution_name
  })
    .then(user => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash
          User.create(userData)
            .then(user => {
              res.json({ status: user.username + 'Registered!' })
              alert (user.username + ' Registered! ' + 'Check your mail for Authentication Password!')
            })
            .catch(err => {
              res.send('error: ' + err)
            })
        })
      } else {
        alert('Institution already exists')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })

    var mailOptions = {
      from: '"Cert App Dev" <dev.certapp@mailbox.org>', // sender address
      to: req.body.email, // receiver address
      subject: 'Authentication Password',
      html: 'Hello <b style="color: #80dfff">' + req.body.institution_name + '</b>,<br>' + 
            'Your authentication password for the institution login will be <b style="color: #80ff80">' + passwordCheckGen + '</b><br>' +
            'Please remember this authentication password!'
    }

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log('Error Occurs!', error);
      }
      else {
        console.log('Message sent: ' + info.response);
      }
    }) 
})

users.post('/instLogin', (req, res) => {
  User.findOne({
    username: req.body.username
  })
    .then(user => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          if (bcrypt.compareSync(req.body.passwordCheck, user.passwordCheck)) {
            // Authentication match
            const payload = {
              email: user.email,
              institution_name: user.institution_name
            }
            let token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: 1440
            })
            res.send(token)
            alert('Login Success')
          } else {
            alert('Authentication Password do not match')
            }
        } else {
            alert('Password do not match')
          }
        }
      else {
        alert('User does not exist' )
    }
 })
    .catch(err => {
      res.send('error: ' + err)
    })
})

users.get('/instProfile', (req, res) => {
  var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

  User.findOne({
    username: decoded.username
  })
    .then(user => {
      if (user) {
        res.json(user)
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

module.exports = users