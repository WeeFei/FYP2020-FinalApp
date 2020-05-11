const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const generator = require('generate-password')
require('dotenv').config();
const nodemailer = require('nodemailer');

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
            })
            .catch(err => {
              res.send('error: ' + err)
            })
        })
      } else {
        res.json({ error: 'User already exists' })
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })

    var mailOptions = {
      from: '"Cert App Dev" <test.certapp@mailbox.org>', // sender address
      to: req.body.email, // receiver address
      subject: 'Student Account Number',
      html: 'Hello <b style="color: #80dfff">' + req.body.first_name + req.body.last_name + ',</b><br>' + 
            'Your student account number is <b style="color: #80ff80">' + accountNumberGen + '</b><br>' +
            'Please remember this student account number as it serves to let others view your profile!'
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
          }
          let token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: 1440
          })
          res.send(token)
        } else {
          // Passwords don't match
          res.json({ error: 'User does not exist' })
        }
      } else {
        res.json({ error: 'User does not exist' })
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
      } else {
        res.send('User does not exist')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

module.exports = users