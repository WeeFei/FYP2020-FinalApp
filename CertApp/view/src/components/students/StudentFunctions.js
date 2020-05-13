// Student Functions

import axios from 'axios'

export const studReg = newUser => {
  return axios
    .post('users/studReg', {
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      username: newUser.username,
      password: newUser.password,
      email: newUser.email
    })
    .then(response => {
      console.log('Registered')
    })
}

export const studLogin = user => {
  return axios
    .post('users/studLogin', {
      username: user.username,
      password: user.password
    })
    .then(response => {
      localStorage.setItem('usertoken', response.data)
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}

export const studVerify = user => {
  return axios
    .post('users/studVerify', {
      username: user.username,
      accountNumberGen: user.accountNumberGen
    })
    .then(response => {
      console.log('Verified')
    })
}

export const getProfile = user => {
  return axios
    .get('users/studProfile', {
      //headers: { Authorization: ` ${this.getToken()}` }
    })
    .then(response => {
      console.log(response)
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}

export const getView = user => {
  return axios
    .get('users/studView', {
      //headers: { Authorization: ` ${this.getToken()}` }
    })
    .then(response => {
      console.log(response)
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}