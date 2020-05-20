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

users.post('/studReg', (req, res) => {
  const today = new Date()
  const accountNumberGen = generator.generate({
    length: 10,
    numbers: true
  })
  const accountNumberCheck = bcrypt.hashSync(accountNumberGen, 10)
  const role = "Student"
  const userData = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    accountNumberGen: accountNumberGen,
    accountNumberCheck: accountNumberCheck,
    created: today,
    role: role
  }

  User.findOne({
    username: req.body.username
  })
    .then(user => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash
          User.create(userData)
            .then(user => {
              res.json({ status: user.username + 'Registered!' })
              alert(user.first_name + ' ' + user.last_name + ' Registered! ' + 'Check institution mail for Account Number!')
            })
            .catch(err => {
              res.send('error: ' + err)
            })
        })
      } else {
        alert('User already exists')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })

    var mailOptions = {
      from: '"Cert App Dev" <dev.certapp@mailbox.org>', // sender address
      to: req.body.email, // receiver address
      subject: 'Student Account Number',
      html: 'Hello,' + '<br>' + 
            'Student account number for <b style="color: #3451C7">' + req.body.first_name + ' ' + req.body.last_name + '</b>' + ' is ' + '<b style="color: #80ff80">' + accountNumberGen + '</b><br>'
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

users.post('/studLogin', (req, res) => {
  User.findOne({
    username: req.body.username
  })
    .then(user => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          // Passwords match
          const payload = {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            accountNumberGen: user.accountNumberGen
          }
          let token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: 1440
          })
          res.send(token)
          alert('Login Success')
        } else {
          // Passwords don't match
          alert('Password do not match')
        }
      } else {
        alert('User does not exist in database')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    }) 
})

users.post('/studVerify', (req, res) => {
  User.findOne({
    username: req.body.username
  })
    .then(user => {
      if (user) {
        if (req.body.accountNumberGen === user.accountNumberGen) {
          // Account Number match
          console.log("Verification Success")
          res.json(user)  
          alert('Verification Success!')
        } else {
          // Account Number don't match
          console.log('Invalid Account Number')
          alert('Invalid Account Number!')
        }
      } else {
        console.log('Verification Failed')
        alert('Verification Failed!')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    }) 
})

users.get('/studProfile', (req, res) => {
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

users.get('/studView', (req, res) => {
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